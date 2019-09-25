import { DataPointType } from '@antv/g2/lib/interface';
import * as _ from '@antv/util';
import BaseLayer from '../../base/ViewLayer';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import BaseConfig, { ElementOption, ICatAxis, ITimeAxis, IValueAxis, Label } from '../../interface/config';
import { extractAxis } from '../../util/axis';
import { extractScale } from '../../util/scale';
import responsiveMethods from './applyResponsive/index';
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

export interface BarLayerConfig extends BaseConfig {
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

export default class BaseBarLayer<T extends BarLayerConfig = BarLayerConfig> extends BaseLayer<T> {
  public bar: any;

  protected geometryParser(dim, type) {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected setType() {
    this.type = 'bar';
  }

  protected beforeInit() {
    const props = this.initialProps;
    /** 响应式图形 */
    if (props.responsive && props.padding !== 'auto') {
      this._applyResponsive('preRender');
    }
  }

  protected _setDefaultG2Config() {}

  protected _scale() {
    const props = this.initialProps;
    const scales = {};
    /** 配置x-scale */
    scales[props.yField] = {
      type: 'cat',
    };
    if (_.has(props, 'xAxis')) {
      extractScale(scales[props.yField], props.yAxis);
    }
    /** 配置y-scale */
    scales[props.xField] = {};
    if (_.has(props, 'yAxis')) {
      extractScale(scales[props.xField], props.xAxis);
    }
    this.setConfig('scales', scales);
    super._scale();
  }

  protected _coord() {
    const coordConfig = {
      actions: [['transpose']],
    };
    this.setConfig('coord', coordConfig);
  }

  // TODO： 条形图的坐标轴样式需要在theme里注册一下
  protected _axis() {
    const props = this.initialProps;
    const axesConfig = { fields: {} };
    const plotTheme = this.plotTheme;
    axesConfig.fields[props.xField] = {};
    axesConfig.fields[props.yField] = {};

    if (
      (props.xAxis && props.xAxis.visible === false) ||
      (plotTheme.axis.x.visible === false && (!props.xAxis || props.xAxis.visible !== true))
    ) {
      axesConfig.fields[props.xField] = false;
    } else if (props.xAxis) {
      extractAxis(axesConfig.fields[props.xField], props.xAxis);
    }

    if (
      (props.yAxis && props.yAxis.visible === false) ||
      (plotTheme.axis.y.visible === false && (!props.yAxis || props.yAxis.visible !== true))
    ) {
      axesConfig.fields[props.yField] = false;
    } else if (props.yAxis) {
      extractAxis(axesConfig.fields[props.yField], props.yAxis);
    }
    /** 存储坐标轴配置项到config */
    this.setConfig('axes', axesConfig);
  }

  protected _adjustBar(bar: ElementOption) {
    return;
  }

  protected _addGeometry() {
    const props = this.initialProps;
    const bar = getGeom('interval', 'main', {
      positionFields: [props.yField, props.xField],
      plot: this,
    });
    if (props.label) {
      bar.label = this._extractLabel();
    }
    this._adjustBar(bar);
    this.bar = bar;
    this.setConfig('element', bar);
  }

  protected _interactions() {}

  protected _annotation() {}

  protected _animation() {
    const props = this.initialProps;
    if (props.animation === false) {
      /** 关闭动画 */
      this.bar.animate = false;
    }
  }

  protected afterRender() {
    super.afterRender();
    const props = this.initialProps;
    /** 响应式 */
    if (props.responsive && props.padding !== 'auto') {
      this._applyResponsive('afterRender');
    }
  }

  protected _extractLabel() {
    const props = this.initialProps;
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

  protected _events(eventParser) {
    super._events(EventParser);
  }

  private _applyResponsive(stage) {
    const methods = responsiveMethods[stage];
    _.each(methods, (r) => {
      const responsive = r as DataPointType;
      responsive.method(this);
    });
  }
}
