import * as _ from '@antv/util';
import BasePlot from '../../base/plot';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import BaseConfig, { ElementOption, ICatAxis, ITimeAxis, IValueAxis, Label } from '../../interface/config';
import { extractScale } from '../../util/scale';
import '../column/guide/label/column-label';
import responsiveMethods from './applyResponsive/index';

interface ColumnStyle {
  opacity?: number;
  lineDash?: number[];
}

interface IObject {
  [key: string]: any;
}

const GEOM_MAP = {
  column: 'interval',
};

export interface ColumnConfig extends BaseConfig {
  // 图形
  type?: 'rect' | 'triangle' | 'round';
  // 百分比, 数值, 最小最大宽度
  columnSize?: number;
  maxthWidth?: number;
  minWidth?: number;
  columnStyle?: ColumnStyle | ((...args: any[]) => ColumnStyle);
  xAxis?: ICatAxis | ITimeAxis;
  yAxis?: IValueAxis;
}

export default class BaseColumn<T extends ColumnConfig = ColumnConfig> extends BasePlot<T> {
  public column: any;
  constructor(container: string | HTMLElement, config: T) {
    super(container, config);
  }

  protected geometryParser(type) {
    return GEOM_MAP[type];
  }

  protected _beforeInit() {
    this.type = 'column';
    const props = this._initialProps;
    /** 响应式图形 */
    if (props.responsive && props.padding !== 'auto') {
      this._applyResponsive('preRender');
    }
  }

  protected _setDefaultG2Config() {}

  protected _scale() {
    const props = this._initialProps;
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
    this._setConfig('scales', scales);
    super._scale();
  }

  protected _coord() {}

  /*protected _axis() {
    const props = this._initialProps;
    const axesConfig = { fields:{} };
    const xAxis_parser = new AxisParser({
      plot: this,
      dim: 'x'
    }).config;
    const yAxis_parser = new AxisParser({
      plot: this,
      dim: 'y'
    }).config;

    axesConfig.fields[props.xField] = xAxis_parser;
    axesConfig.fields[props.yField] = yAxis_parser;
    this._setConfig('axes', axesConfig);
  }*/

  protected _adjustColumn(column: ElementOption) {
    return;
  }

  protected _addElements() {
    const props = this._initialProps;

    const column = getGeom('interval', 'main', {
      positionFields: [props.xField, props.yField],
      plot: this,
    });

    if (props.label) {
      column.label = this._extractLabel();
    }
    this._adjustColumn(column);
    this.column = column;
    this._setConfig('element', column);
  }

  protected _interactions() {}

  protected _annotation() {}

  protected _animation() {
    const props = this._initialProps;
    if (props.animation === false) {
      /** 关闭动画 */
      this.column.animate = false;
    }
  }

  protected _afterInit() {
    super._afterInit();
    const props = this._initialProps;
    /** 响应式 */
    if (props.responsive && props.padding !== 'auto') {
      this.plot.once('afterrender', () => {
        this._applyResponsive('afterRender');
      });
    }
  }

  protected _extractLabel() {
    const props = this._initialProps;
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
      const responsive = r as IObject;
      responsive.method(this);
    });
  }
}
