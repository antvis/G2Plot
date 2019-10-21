import { DataPointType } from '@antv/g2/lib/interface';
import * as _ from '@antv/util';
import ViewLayer from '../../base/ViewLayer';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import BaseConfig, { ElementOption, ICatAxis, ITimeAxis, IValueAxis, Label } from '../../interface/config';
import { extractScale } from '../../util/scale';
import responsiveMethods from './applyResponsive/index';
import './applyResponsive/theme';
import './component/label/column-label';
import * as EventParser from './event';
import './theme';

interface ColumnStyle {
  opacity?: number;
  lineDash?: number[];
}

const G2_GEOM_MAP = {
  column: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'column',
};

export interface ColumnLayerConfig extends BaseConfig {
  // 图形
  type?: 'rect' | 'triangle' | 'round';
  // 百分比, 数值, 最小最大宽度
  columnSize?: number;
  maxWidth?: number;
  minWidth?: number;
  columnStyle?: ColumnStyle | ((...args: any[]) => ColumnStyle);
  xAxis?: ICatAxis | ITimeAxis;
  yAxis?: IValueAxis;
}

export default class BaseColumnLayer<T extends ColumnLayerConfig = ColumnLayerConfig> extends ViewLayer<T> {
  public column: any;

  protected geometryParser(dim, type) {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected setType() {
    this.type = 'column';
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
    scales[props.xField] = {};
    if (_.has(props, 'xAxis')) {
      extractScale(scales[props.xField], props.xAxis);
    }
    /** 配置y-scale */
    scales[props.yField] = {};
    if (_.has(props, 'yAxis')) {
      extractScale(scales[props.yField], props.yAxis);
    }
    this.setConfig('scales', scales);
    super._scale();
  }

  protected _coord() {}

  protected _adjustColumn(column: ElementOption) {
    return;
  }

  protected _addGeometry() {
    const props = this.initialProps;

    const column = getGeom('interval', 'main', {
      positionFields: [props.xField, props.yField],
      plot: this,
    });

    if (props.label) {
      column.label = this._extractLabel();
    }
    this._adjustColumn(column);
    this.column = column;
    this.setConfig('element', column);
  }

  protected _annotation() {}

  protected _animation() {
    const props = this.initialProps;
    if (props.animation === false) {
      /** 关闭动画 */
      this.column.animate = false;
    }
  }

  protected _events(eventParser) {
    super._events(EventParser);
  }

  protected afterRender() {
    const props = this.initialProps;
    /** 响应式 */
    if (props.responsive && props.padding !== 'auto') {
      this._applyResponsive('afterRender');
    }
    super.afterRender();
  }

  protected _extractLabel() {
    const props = this.initialProps;
    const label = props.label as Label;
    if (label && label.visible === false) {
      return false;
    }
    const labelConfig = getComponent('label', {
      plot: this,
      labelType: 'columnLabel',
      fields: [props.yField],
      ...label,
    });
    return labelConfig;
  }

  private _applyResponsive(stage) {
    const methods = responsiveMethods[stage];
    _.each(methods, (r) => {
      const responsive = r as DataPointType;
      responsive.method(this);
    });
  }
}
