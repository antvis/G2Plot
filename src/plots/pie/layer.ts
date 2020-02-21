import { deepMix } from '@antv/util';
import * as EventParser from './event';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { DataItem, Label } from '../../interface/config';
import { getGeom } from '../../geoms/factory';
import { LayerConfig } from '../../base/layer';
import { LineStyle } from '../line/layer';
import { getPieLabel, PieLabelConfig } from './component/label';
import SpiderLabel from './component/label/spider-label';
import { registerPlotType } from '../../base/global';
import './theme';

interface PieStyle extends LineStyle {
  stroke?: string;
  lineWidth?: number;
}

export interface PieViewConfig extends Omit<ViewConfig, 'label'> {
  angleField: string;
  colorField?: string;
  radius?: number;
  pieStyle?: PieStyle | ((...args: any[]) => PieStyle);
  label?: PieLabelConfig;
}

export interface PieLayerConfig extends PieViewConfig, LayerConfig {}

const G2_GEOM_MAP = {
  pie: 'interval',
};

const PLOT_GEOM_MAP = {
  pie: 'column',
};

export default class PieLayer<T extends PieLayerConfig = PieLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): any {
    return deepMix({}, super.getDefaultOptions(), {
      width: 400,
      height: 400,
      title: {
        visible: false,
      },
      description: {
        visible: false,
      },
      forceFit: true,
      padding: 'auto',
      radius: 0.8,
      label: {
        visible: true,
        type: 'inner',
        autoRotate: false,
        allowOverlap: false,
        line: {
          visible: true,
          smooth: true,
        },
      },
      legend: {
        visible: true,
        position: 'right-center',
      },
      tooltip: {
        visible: true,
        shared: false,
        showCrosshairs: false,
        showMarkers: false,
      },
      pieStyle: {
        stroke: 'white',
        lineWidth: 1,
      },
    });
  }

  public pie: any;
  public type: string = 'pie';

  public getOptions(props: T) {
    // @ts-ignore
    const defaultOptions = this.constructor.getDefaultOptions();
    const options = deepMix({}, super.getOptions(props), defaultOptions, props);
    return options;
  }

  public afterRender() {
    super.afterRender();
    const options = this.options;
    /** 蜘蛛布局label */
    if (options.label && options.label.visible) {
      const labelConfig = options.label as Label;
      if (labelConfig.type === 'spider') {
        const spiderLabel = new SpiderLabel({
          view: this.view,
          fields: options.colorField ? [options.angleField, options.colorField] : [options.angleField],
          ...this.options.label,
        });
        spiderLabel.render();
      } else {
        const LabelCtor = getPieLabel(labelConfig.type);
        const label = new LabelCtor(this, options.label);
        label.render();
      }
    }
  }

  protected geometryParser(dim, type) {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected scale() {
    const props = this.options;
    const scales = {};
    scales[props.angleField] = {};
    scales[props.colorField] = { type: 'cat' };
    this.setConfig('scales', scales);
  }

  protected processData(data?: DataItem[]): DataItem[] | undefined {
    const key = this.options.angleField;
    return data.map((item) => ({
      ...item,
      [key]: typeof item[key] === 'string' ? Number.parseFloat(item[key] as 'string') : item[key],
    }));
  }

  protected axis() {}

  protected coord() {
    const props = this.options;
    const coordConfig: any = {
      type: 'theta',
      cfg: {
        radius: props.radius,
        // @ts-ignore 业务定制,不开放配置
        innerRadius: props.innerRadius || 0,
      },
    };
    this.setConfig('coordinate', coordConfig);
  }

  protected addGeometry() {
    const props = this.options;
    const pie = getGeom('interval', 'main', {
      plot: this,
      positionFields: [1, props.angleField],
    });
    pie.adjust = [{ type: 'stack' }];
    this.pie = pie;
    if (props.label) {
      this.label();
    }
    this.setConfig('geometry', pie);
  }

  protected animation() {
    super.animation();
    const props = this.options;
    if (props.animation === false) {
      /** 关闭动画 */
      this.pie.animate = false;
    }
  }

  protected annotation() {}

  protected parseEvents(eventParser) {
    super.parseEvents(EventParser);
  }

  private label() {
    // 不使用 g2 内置label
    this.pie.label = false;
  }
}

registerPlotType('pie', PieLayer);
