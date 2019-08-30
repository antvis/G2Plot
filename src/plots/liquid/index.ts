import * as _ from '@antv/util';
import BasePlot from '../../base/plot';
import BaseConfig, { ElementOption } from '../../interface/config';
import { extractScale } from '../../util/scale';

import './element/shape/liquid';
import './theme';

interface LiquidStyle {
  color?: string;
  fontColor?: string;
  fontOpacity?: number;
  fontSize?: number;
  borderOpacity?: number;
  borderWidth?: number;
  size?: number;
}

const G2_GEOM_MAP = {
  liquid: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'liquid',
};

export interface LiquidConfig extends BaseConfig {
  type?: 'normal' | 'percent';
  min?: number;
  max?: number;
  value?: number;
  showValue?: boolean;
  format?: (...args: any[]) => string;
  liquidStyle?: LiquidStyle;
}

export default class Liquid extends BasePlot<LiquidConfig> {
  constructor(container: string | HTMLElement, config: LiquidConfig) {
    super(container, config);
  }

  protected geometryParser(dim, type) {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected setType() {
    this.type = 'liquid';
  }

  protected _getStyleMix(valueText) {
    const { liquidStyle = {} } = this._initialProps;
    const { width, height } = this._config.panelRange;
    const size = Math.min(width, height) / 1.2 - Object.assign({ borderWidth: 10 }, liquidStyle).borderWidth;
    const defaultStyle = Object.assign({}, this.plotTheme, {
      fontSize: this._autoFontSize(size, valueText),
      size,
    });
    return Object.assign(defaultStyle, liquidStyle);
  }

  protected _setDefaultG2Config() {
    const { value, type = 'normal' } = this._initialProps;
    const { min = 0, max = 1, format = (d) => `${d}` } = this._initialProps;

    const valueText = this._valueText(type, value, format, min, max);
    const styleMix = this._getStyleMix(valueText);
    this._initialProps.styleMix = styleMix;
    this._initialProps.data = [{ value: typeof value === 'number' && valueText !== '--' ? value : 0 }];
    this._initialProps.valueText = valueText;
    this._initialProps.min = min;
    this._initialProps.max = max;
    this._initialProps.format = format;
  }

  protected _scale() {
    const { min, max, format } = this._initialProps;
    const scales = {
      value: {},
    };
    extractScale(scales.value, {
      min,
      // min max 相等时避免0值在中间
      max: min !== max ? max : max + 1,
      format,
      nice: false,
    });
    // @ts-ignore
    this._setConfig('scales', scales);
    super._scale();
  }

  protected _coord() {}

  protected _axis() {
    const axesConfig = {
      fields: {
        value: false,
        '1': false,
      },
    };
    this._setConfig('axes', axesConfig);
  }

  protected _addElements() {
    const { styleMix = {} } = this._initialProps;

    const liquid: ElementOption = {
      type: 'interval',
      position: {
        fields: ['1', 'value'],
      },
      shape: {
        values: ['liquid-fill-gauge'],
      },
    };

    liquid.color = {
      values: [styleMix.color],
    };
    liquid.size = {
      values: [styleMix.size],
    };
    liquid.style = {
      lineWidth: styleMix.borderWidth,
      opacity: styleMix.borderOpacity,
    };

    this._setConfig('element', liquid);
  }

  protected _interactions() {}

  protected _annotation() {
    const props = this._initialProps;
    if (props.showValue === false) {
      return;
    }

    const { valueText, styleMix } = this._initialProps;
    const annotationConfigs = [];
    const text = {
      type: 'text',
      content: valueText,
      top: true,
      position: ['50%', '50%'],
      style: {
        fill: styleMix.fontColor,
        opacity: styleMix.fontOpacity,
        fontSize: styleMix.fontSize,
        textAlign: 'center',
      },
    };
    annotationConfigs.push(text);
    this._setConfig('annotations', annotationConfigs);
  }

  protected _animation() {}

  private _percent(num: number, fixed: number = 2): string {
    if (isNaN(num)) {
      return `${num}`;
    }
    return `${(num * 100).toFixed(fixed)}%`.replace(/\.0*%/, '%');
  }

  private _valueText(type, value, format, min, max) {
    if (type === 'percent') {
      if (max - min === 0) {
        return '--';
      }
      const percentValue = (value - min) / (max - min);
      return typeof value === 'number' ? format(this._percent(percentValue), percentValue) : '--';
    }
    return typeof value === 'number' ? format(value) : '--';
  }

  private _autoFontSize(space, text) {
    const fontSizeBySpace = space / 4;
    const fontSizeByText = (space / text.length) * 1.5;
    return Math.min(fontSizeBySpace, fontSizeByText);
  }
}
