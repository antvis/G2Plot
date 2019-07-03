import * as _ from '@antv/util';

import BasePlot from '../../base/plot';
import BaseConfig, { ElementOption } from '../../interface/config';
import { extractScale } from '../../util/scale';

import './element/shape/liquid';

interface LiquidStyle {
  color?: string;
  fontColor?: string;
  fontOpacity?: number;
  fontSize?: number;
  borderOpacity?: number;
  borderWidth?: number;
}

export interface LiquidConfig extends BaseConfig {
  type?: 'normal' | 'percent';
  min?: number;
  max?: number;
  value?: number;
  showValue?: boolean;
  format?: Function;
  style?: LiquidStyle;
}

export default class BaseColumn<T extends LiquidConfig = LiquidConfig> extends BasePlot<T>{
  constructor(container: string | HTMLElement, config: T) {
    super(container, config);
  }

  protected _beforeInit() {
    this.type = 'liquid';
  }

  protected _setDefaultG2Config() {}

  protected _scale() {
    const props = this._initialProps;
    const scales = {};
    // default config
    scales['value'] = {
      min: 0,
      max: 1,
      nice: false,
      format: (d) => `${d}`,
    };
    extractScale(scales['value'], {
      min: props.min,
      max: props.max,
      formatter: props.format,
    });
    this._setConfig('scales', scales);
  }

  protected _coord() {}

  protected _axis() {
    const axesConfig = { fields: {} };
    axesConfig.fields['value'] = false;
    // axesConfig.fields['1'] = false;
    this._setConfig('axes', axesConfig);
  }

  protected _addElements() {
    const props = this._initialProps;
    const style: LiquidStyle = _.has(props, 'style') ? props.style : {};
    const liquid: ElementOption = {
      type: 'interval',
      position: {
        fields: [ '1', 'value' ],
      },
      shape: {
        values: [ 'liquid-fill-gauge' ],
      },
    };

    if (_.has(style, 'color')) {
      liquid.color = {
        values: [ style.color ],
      };
    }
    // const { width, height } = this.canvasCfg;
    // console.log(this.plot && this.plot.get('viewRange'));
    const { width, height } = this._config.panelRange;
    // const { width, height } = this.plot.cfg.viewRange;
    // console.log(this.plot && this.plot.get('panelRange'));
    const intervalSize = Math.min(width, height) / 1.125 - Object.assign({ borderWidth: 10 }, style).borderWidth;
    if (_.has(style, 'color')) {
      liquid.size = {
        values: [ intervalSize ],
      };
    }
    this._setConfig('element', liquid);
  }

  protected _interactions() { }

  protected _annotation() {}

  protected _animation() {}

  private _liquidStyle() {
    const props = this._initialProps;
    const liquidStyleProps = props.liquidStyle;
    const config = {
      fields: null,
      callback: null,
      cfg: liquidStyleProps,
    };
    return config;
  }

}
