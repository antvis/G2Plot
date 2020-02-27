import { deepMix, has, each } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import { ElementOption, ICatAxis, ITimeAxis, IValueAxis, Label, DataItem } from '../../interface/config';
import { extractScale } from '../../util/scale';
import responsiveMethods from './apply-responsive';
import BarLabel from './component/label';
import * as EventParser from './event';
import './theme';

interface BarStyle {
  opacity?: number;
  lineDash?: number[];
}

const G2_GEOM_MAP = {
  bar: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'bar',
};

export interface BarViewConfig extends ViewConfig {
  colorField?: string;
  // 百分比, 数值, 最小最大宽度
  barSize?: number;
  maxWidth?: number;
  minWidth?: number;
  barStyle?: BarStyle | ((...args: any[]) => BarStyle);
  xAxis?: ICatAxis | ITimeAxis;
  yAxis?: IValueAxis;
}

export interface BarLayerConfig extends BarViewConfig, LayerConfig {}

export default class BaseBarLayer<T extends BarLayerConfig = BarLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): Partial<BarViewConfig> {
    const cfg: Partial<BarViewConfig> = {
      xAxis: {
        visible: true,
        line: {
          visible: false,
        },
        title: {
          visible: true,
        },
        label: {
          visible: false,
        },
        tickLine: {
          visible: false,
        },
        grid: {
          visible: false,
        },
      },
      yAxis: {
        visible: true,
        autoHideLabel: false,
        autoRotateLabel: false,
        autoRotateTitle: true,
        nice: true,
        grid: {
          visible: false,
        },
        line: {
          visible: false,
        },
        tickLine: {
          visible: false,
        },
        label: {
          visible: true,
        },
        title: {
          visible: false,
          offset: 12,
        },
      },
      tooltip: {
        visible: true,
        shared: true,
        showCrosshairs: false,
        showMarkers: false,
      },
      label: {
        visible: true,
        position: 'left',
        adjustColor: true,
      },
      legend: {
        visible: false,
        position: 'top-left',
      },
      interactions: [
        { type: 'tooltip' }, 
        { type: 'element-active' }, 
        { type: 'active-region' },
        { type: 'legend-active' },
        { type: 'legend-filter'}
      ],
    };
    return deepMix({}, super.getDefaultOptions(), cfg);
  }

  public bar: any;
  public type: string = 'bar';

  public beforeInit() {
    super.beforeInit();
    const props = this.options;
    /** 响应式图形 */
    if (props.responsive && props.padding !== 'auto') {
      this.applyResponsive('preRender');
    }
  }

  public afterRender() {
    const props = this.options;
    this.renderLabel();
    /** 响应式 */
    if (props.responsive && props.padding !== 'auto') {
      this.applyResponsive('afterRender');
    }
    super.afterRender();
  }

  protected geometryParser(dim, type) {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected processData(data?: DataItem[]): DataItem[] {
    return data ? data.slice().reverse() : data;
  }

  protected scale() {
    const props = this.options;
    const scales = {};
    /** 配置x-scale */
    scales[props.yField] = {
      type: 'cat',
    };
    if (has(props, 'yAxis')) {
      extractScale(scales[props.yField], props.yAxis);
    }
    /** 配置y-scale */
    scales[props.xField] = {};
    if (has(props, 'xAxis')) {
      extractScale(scales[props.xField], props.xAxis);
    }
    this.setConfig('scales', scales);
    super.scale();
  }

  protected coord() {
    this.setConfig('coordinate', {
      actions: [['transpose']],
    });
  }

  protected axis(): void {
    const xAxis_parser = getComponent('axis', {
      plot: this,
      dim: 'x',
    });
    const yAxis_parser = getComponent('axis', {
      plot: this,
      dim: 'y',
    });
    /** 转置坐标系特殊配置 */
    xAxis_parser.position = 'left';
    yAxis_parser.position = 'bottom';
    const axesConfig = {};
    axesConfig[this.options.xField] = xAxis_parser;
    axesConfig[this.options.yField] = yAxis_parser;
    /** 存储坐标轴配置项到config */
    this.setConfig('axes', axesConfig);
  }

  protected adjustBar(bar: ElementOption) {}

  protected addGeometry() {
    const props = this.options;
    const bar = getGeom('interval', 'main', {
      positionFields: [props.yField, props.xField],
      plot: this,
    });
    this.adjustBar(bar);
    this.bar = bar;
    this.setConfig('geometry', bar);
  }

  protected animation() {
    super.animation();
    const props = this.options;
    if (props.animation === false) {
      /** 关闭动画 */
      this.bar.animate = false;
    }
  }

  protected parseEvents(eventParser) {
    super.parseEvents(EventParser);
  }

  protected renderLabel() {
    const { scales } = this.config;
    const { yField } = this.options;
    const scale = scales[yField];
    if (this.options.label && this.options.label.visible) {
      const label = new BarLabel({
        view: this.view,
        plot: this,
        formatter: scale.formatter,
        ...this.options.label,
      });
      label.render();
    }
  }

  private applyResponsive(stage) {
    const methods = responsiveMethods[stage];
    each(methods, (r) => {
      const responsive = r;
      responsive.method(this);
    });
  }

  public getLabelOptionsByPosition(position: string) {
    if (position === 'middle') {
      return {
        offset: 0,
      };
    }

    if (position === 'left') {
      return {
        offset: 7,
        style: {
          stroke: null,
          lineWidth: 0,
        },
      };
    }

    if (position === 'right') {
      return {
        offset: 4,
      };
    }
  }
}

registerPlotType('bar', BaseBarLayer);
