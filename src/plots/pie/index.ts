import { CoordinateType } from '@antv/g2/lib/plot/interface';
import * as _ from '@antv/util';
import BasePlot from '../../base/plot';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import BaseConfig, { ElementOption, IColorConfig, Label } from '../../interface/config';
import { extractScale } from '../../util/scale';
import * as EventParser from './event';
import SpiderLabel from './guide/label/spiderLabel';

export interface PieConfig extends BaseConfig {
  angleField: string;
  colorField?: string;
  radius?: number;
  pieStyle?: {};
}

const G2_GEOM_MAP = {
  pie: 'interval',
};

const PLOT_GEOM_MAP = {
  pie: 'column'
};

export default class PiePlot<T extends PieConfig = PieConfig> extends BasePlot<T> {
  public pie: any;
  public spiderLabel: any;

  protected geometryParser(dim,type) {
    if(dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type]; 
  }

  protected setType(){
    //this.type = 'pie';
  }

  protected _setDefaultG2Config() {}

  protected _scale() {
    const props = this._initialProps;
    const scales = {};
    /** 配置x-scale */
    scales[props.angleField] = {};
    if (_.has(props, 'xAxis')) {
      extractScale(scales[props.angleField], props.xAxis);
    }
    super._scale();
  }

  protected _axis() {}

  protected _coord() {
    const props = this._initialProps;
    const coordConfig = {
      type: 'theta' as CoordinateType,
      cfg: {
        radius: 0.8, // default radius值
      },
    };
    if (_.has(props, 'radius')) {
      coordConfig.cfg.radius = props.radius;
    }
    this._setConfig('coord', coordConfig);
  }

  protected _addElements() {
    const props = this._initialProps;
    this._adjustPieStyle();
    const pie = getGeom('interval', 'main', {
      plot: this,
      positionFields: [props.angleField],
    });
    pie.adjust = [{ type: 'stack' }];
    this.pie = pie;
    if (props.label) {
      this._label();
    }
    this._setConfig('element', pie);
  }

  protected _animation() {
    const props = this._initialProps;
    if (props.animation === false) {
      /** 关闭动画 */
      this.pie.animate = false;
    }
  }

  protected _annotation() {}

  protected _interactions() {}

  protected _events(eventParser) {
    super._events(EventParser);
  }

  protected _afterInit() {
    super._afterInit();
    const props = this._initialProps;
    /** 蜘蛛布局label */
    if (props.label) {
      const labelConfig = props.label as Label;
      if (labelConfig.type === 'spider') {
        const spiderLabel = new SpiderLabel({
          view: this.plot,
          fields: props.colorField ? [props.angleField, props.colorField] : [props.angleField],
          style: labelConfig.style ? labelConfig.style : {},
          formatter: props.label.formatter ? props.label.formatter : false,
        });
        this.spiderLabel = spiderLabel;
      }
    }
  }

  private _adjustPieStyle() {
    const props = this._initialProps;
    if (!props.colorField) {
      const defaultStyle = { stroke: 'white', lineWidth: 1 };
      if (!props.pieStyle) {
        props.pieStyle = {};
      }
      props.pieStyle = _.deepMix(props.pieStyle, defaultStyle);
    }
  }

  private _label() {
    const props = this._initialProps;
    const labelConfig = props.label as Label;
    if (!this._showLabel()) {
      this.pie.label = false;
      return;
    }
    if (labelConfig.type === 'inner') {
      const offsetBase = -2;
      labelConfig.offset = labelConfig.offset ? offsetBase + labelConfig.offset : offsetBase;
    }

    this.pie.label = getComponent('label', {
      plot: this,
      fields: props.colorField ? [props.angleField, props.colorField] : [props.angleField],
      ...labelConfig,
    });
  }

  private _showLabel() {
    const props = this._initialProps;
    return props.label && props.label.visible === true && props.label.type !== 'spider';
  }
}
