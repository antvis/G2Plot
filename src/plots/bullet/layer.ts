import { deepMix, has } from '@antv/util';
import * as EventParser from './event';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { extractScale } from '../../util/scale';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import { LayerConfig } from '../../base/layer';
import { registerPlotType } from '../../base/global';
import BulletRect from './component/bulletRect';
import BulletTarget from './component/bulletTarget';
import { TextStyle, LineStyle } from '../../interface/config';
import './theme';

const G2_GEOM_MAP = {
  bullet: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'bullet',
};

export const STACK_FIELD = '$$stackField$$';
export const X_FIELD = '$$xField$$';
export const Y_FIELD = '$$yField$$';

interface BulletAxisTickLine extends LineStyle {
  visible?: boolean;
}

export interface BulletAxis {
  visible: boolean;
  position?: 'before' | 'after';
  style?: TextStyle;
  tickCount?: number;
  tickLine?: BulletAxisTickLine;
  formatter?: (text: string, idx: number) => string;
}

export interface BulletViewConfig extends ViewConfig {
  data: {
    /** 子弹图标题 */
    title?: string;
    /** 进度值，array类型。支持阶段性的进度值（即堆叠） */
    measures: number[];
    /** 进度条的色条范围区间，相对数值：[0, 1] */
    ranges?: number[];
    /** 目标值，array类型。支持多目标设置 */
    targets: number[];
  }[];
  /** 进度条的色条范围区间的最大值 */
  rangeMax: number;
  /** 实际进度条大小设置 */
  measureSize?: number;
  measureColors?: string[];
  /** 区间背景条大小设置。ratio number, relative to measureSize */
  rangeSize?: number;
  /** 进度条背景颜色 */
  rangeColors?: string[];
  /** 目标值 marker 大小设置。ratio number, relative to measureSize */
  markerSize?: number;
  /** marker 的填充色 */
  markerColors?: string[];
  markerStyle?: {
    /** marker 的宽度，default: 1 */
    width?: number;
    /** marker 的填充色, 若存在 markerColors, 优先取 markerColors */
    fill?: string;
    [k: string]: any;
  };
  /** 进度条刻度轴设置 */
  axis?: BulletAxis;
  stackField?: string;
}

export interface BulletLayerConfig extends BulletViewConfig, LayerConfig {}

export default abstract class BulletLayer extends ViewLayer<BulletViewConfig> {
  public bullet;
  protected bulletRect;
  protected bulletTarget;
  public type: string = 'bullet';
  public static getDefaultOptions(): Partial<BulletViewConfig> {
    return deepMix({}, super.getDefaultOptions(), {
      data: [],
      stackField: STACK_FIELD,
      xField: X_FIELD,
      yField: Y_FIELD,
      rangeColors: ['rgba(91, 143, 249, 0.45)'],
      measureSize: 12,
      rangeSize: 2,
      markerSize: 2,
      markerColors: [],
      markerStyle: {
        width: 2,
        fill: '#5B8FF9',
        lineWidth: 0,
      },
      axis: {
        visible: false,
        position: 'before',
        tickCount: 6,
        formatter: (text, idx) => `${idx}`,
        style: {
          fill: 'rgba(0, 0, 0, 0.25)',
          textBaseline: 'middle',
          textAlign: 'center',
          fontSize: 12,
          lineHeight: 16,
        },
        tickLine: {
          visible: true,
          lineWidth: 1,
          stroke: '#FFF',
          lineDash: [4, 2],
        },
      },
      xAxis: {
        visible: true,
        line: {
          visible: false,
        },
        tickLine: {
          visible: false,
        },
        label: {
          visible: true,
        },
      },
      yAxis: {
        visible: false,
        nice: false,
      },
      tooltip: {
        visible: false,
        trigger: 'item',
        crosshairs: false,
      },
      label: {
        visible: true,
        offset: 4,
        style: {
          fill: 'rgba(0, 0, 0, 0.45)',
          stroke: '#fff',
          lineWidth: 1,
        },
      },
    });
  }

  public afterRender() {
    super.afterRender();
    this.view.removeInteraction('legend-filter');
  }

  protected scale() {
    const options = this.options;
    const scales = {};
    /** 配置y-scale */
    scales[options.yField] = {};
    if (has(options, 'yAxis')) {
      extractScale(scales[options.yField], options.yAxis);
    }
    /** 配置x-scale */
    scales[options.xField] = {
      type: 'cat',
    };
    if (has(options, 'xAxis')) {
      extractScale(scales[options.xField], options.xAxis);
    }
    this.setConfig('scales', scales);
    super.scale();
  }

  public getOptions(props: BulletViewConfig) {
    const options = super.getOptions(props);
    this.adjustOptions(options);
    return options;
  }

  public afterInit() {
    super.afterInit();
    const options = this.options;
    const ranges = options.data.map((d) => d.ranges);
    const targets = options.data.map((d) => d.targets);
    this.bulletRect = new BulletRect(this.view, {
      ranges,
      rangeMax: options.rangeMax,
      yField: options.yField,
      rangeSize: options.rangeSize,
      rangeColors: options.rangeColors || [],
      axis: options.axis,
    });
    this.bulletTarget = new BulletTarget(this.view, {
      targets,
      yField: options.yField,
      markerSize: options.markerSize,
      markerColors: options.markerColors || [],
      markerStyle: options.markerStyle,
    });
  }

  protected geometryParser(dim, type) {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected coord() {
    this.setConfig('coordinate', {
      actions: [['transpose']],
    });
  }

  /** 自定义子弹图图例 */
  protected legend() {
    const options = this.options;
    const markerColor = options.markerStyle.fill;
    const measureColors = options.measureColors || this.theme.colors;
    const items = [
      {
        name: '实际进度', // 图例项的文本内容
        value: '实际进度',
        marker: {
          symbol: 'square', // 该图例项 marker 的形状，参见 marker 参数的说明
          style: {
            fill: measureColors[0], // 该图例项 marker 的填充颜色
          },
        },
      },
      {
        name: '目标值', // 图例项的文本内容
        value: '目标值',
        marker: {
          symbol: 'line', // 该图例项 marker 的形状，参见 marker 参数的说明
          style: {
            stroke: markerColor, // 该图例项 marker 的填充颜色
            lineWidth: 2, // 该图例项 marker 的填充颜色
          },
        },
      },
    ];
    const legendOptions = {
      custom: true,
      position: 'bottom',
      items,
      ...options.legend,
    };
    // @ts-ignore
    this.setConfig('legends', legendOptions);
  }

  protected addGeometry() {
    const options = this.options;
    const bullet = getGeom('interval', 'main', {
      positionFields: [options.xField, options.yField],
      plot: this,
    });
    bullet.adjust = [
      {
        type: 'stack',
      },
    ];
    if (options.label) {
      bullet.label = this.extractLabel();
    }
    this.bullet = bullet;
    this.setConfig('geometry', bullet);
  }

  protected parseEvents() {
    super.parseEvents(EventParser);
  }

  protected extractLabel() {
    const options = this.options;
    const label = deepMix({}, options.label);
    if (label.visible === false) {
      return false;
    }
    const labelConfig = getComponent('label', {
      plot: this,
      labelType: 'barLabel',
      fields: [options.yField],
      ...label,
    });
    return labelConfig;
  }

  protected adjustOptions(options): void {
    options.barSize = options.measureSize || 12;
    this.adjustYAxisOptions(options);
  }

  protected adjustYAxisOptions(options): void {
    const values = [];
    options.data.forEach((d) => values.push(d.measures.reduce((a, b) => a + b, 0)));
    values.push(options.rangeMax);
    options.yAxis.max = Math.max.apply([], values);
  }

  protected processData(dataOptions: BulletViewConfig['data']) {
    const options = this.options;
    const data = [];
    dataOptions.forEach((dataItem, dataIdx) => {
      for (let valueIdx = 0; valueIdx < dataItem.measures.length; valueIdx += 1) {
        const value = dataItem.measures[valueIdx];
        const xField = dataItem.title || `${dataIdx}`;
        data.push({
          [options.xField]: xField,
          [options.yField]: value,
          [options.stackField]: `${valueIdx}`,
        });
      }
    });
    return data;
  }
}

registerPlotType('bullet', BulletLayer);
