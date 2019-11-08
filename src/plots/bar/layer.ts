import { DataPointType } from '@antv/g2/lib/interface';
import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import ViewLayer, { ViewLayerCfg } from '../../base/view-layer';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import BaseConfig, { ElementOption, ICatAxis, ITimeAxis, IValueAxis, Label } from '../../interface/config';
import { extractAxis } from '../../util/axis';
import { extractScale } from '../../util/scale';
import responsiveMethods from './apply-responsive';
import './component/label/bar-label';
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

export interface BarLayerConfig extends ViewLayerCfg {
  // 图形
  type?: 'rect'; // todo | 'triangle' | 'round';
  // 百分比, 数值, 最小最大宽度
  barSize?: number;
  maxWidth?: number;
  minWidth?: number;
  barStyle?: BarStyle | ((...args: any[]) => BarStyle);
  xAxis?: ICatAxis | ITimeAxis;
  yAxis?: IValueAxis;
}

export default class BaseBarLayer<T extends BarLayerConfig = BarLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
      xAxis: {
        visible: false,
      },
      yAxis: {
        visible: true,
        autoHideLabel: false,
        autoRotateLabel: false,
        autoRotateTitle: true,
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
        shared: false,
        crosshairs: {
          type: 'rect',
        },
      },
      label: {
        visible: true,
        position: 'left',
        offset: 8,
        adjustColor: true,
      },
      legend: {
        visible: true,
        position: 'top-left',
      },
    });
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

  protected processData(data?: object[]): object[] {
    return data ? data.slice().reverse() : data;
  }

  protected scale() {
    const props = this.options;
    const scales = {};
    /** 配置x-scale */
    scales[props.yField] = {
      type: 'cat',
    };
    if (_.has(props, 'yAxis')) {
      extractScale(scales[props.yField], props.yAxis);
    }
    /** 配置y-scale */
    scales[props.xField] = {};
    if (_.has(props, 'xAxis')) {
      extractScale(scales[props.xField], props.xAxis);
    }
    this.setConfig('scales', scales);
    super.scale();
  }

  protected coord() {
    const coordConfig = {
      actions: [['transpose']],
    };
    this.setConfig('coord', coordConfig);
  }

  protected axis() {
    const props = this.options;
    const axesConfig = { fields: {} };
    axesConfig.fields[props.xField] = {};
    axesConfig.fields[props.yField] = {};

    if (props.xAxis.visible === false) {
      axesConfig.fields[props.xField] = false;
    } else {
      extractAxis(axesConfig.fields[props.xField], props.xAxis);
    }

    if (props.yAxis.visible === false) {
      axesConfig.fields[props.yField] = false;
    } else {
      extractAxis(axesConfig.fields[props.yField], props.yAxis);
    }
    /** 存储坐标轴配置项到config */
    this.setConfig('axes', axesConfig);
  }

  protected adjustBar(bar: ElementOption) {
    return;
  }

  protected addGeometry() {
    const props = this.options;
    const bar = getGeom('interval', 'main', {
      positionFields: [props.yField, props.xField],
      plot: this,
    });
    if (props.label) {
      bar.label = this.extractLabel();
    }
    this.adjustBar(bar);
    this.bar = bar;
    this.setConfig('element', bar);
  }

  protected annotation() {}

  protected animation() {
    const props = this.options;
    if (props.animation === false) {
      /** 关闭动画 */
      this.bar.animate = false;
    }
  }

  protected extractLabel() {
    const props = this.options;
    const label = props.label as Label;

    if (label && label.visible === false) {
      return false;
    }
    const labelConfig = getComponent('label', {
      plot: this,
      labelType: 'barLabel',
      fields: [props.xField],
      ...label,
    });

    return labelConfig;
  }

  protected parserEvents(eventParser) {
    super.parserEvents(EventParser);
  }

  private applyResponsive(stage) {
    const methods = responsiveMethods[stage];
    _.each(methods, (r) => {
      const responsive = r as DataPointType;
      responsive.method(this);
    });
  }
}

registerPlotType('bar', BaseBarLayer);
