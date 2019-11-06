import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import ViewLayer, { ViewLayerCfg } from '../../base/view-layer';
import { ElementOption } from '../../interface/config';
import { extractScale } from '../../util/scale';

import './geometry/shape/liquid';
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

export interface LiquidLayerConfig extends ViewLayerCfg {
  type?: 'normal' | 'percent';
  min?: number;
  max?: number;
  value?: number;
  showValue?: boolean;
  format?: (...args: any[]) => string;
  liquidStyle?: LiquidStyle;
}

export default class LiquidLayer extends ViewLayer<LiquidLayerConfig> {
  public type: string = 'liquid';

  public init() {
    const { value, type = 'normal' } = this.options;
    const { min = 0, max = 1, format = (d) => `${d}` } = this.options;

    const valueText = this.valueText(type, value, format, min, max);
    const styleMix = this.getStyleMix(valueText);
    this.options.styleMix = styleMix;
    this.options.data = [{ value: typeof value === 'number' && valueText !== '--' ? value : 0 }];
    this.options.valueText = valueText;
    this.options.min = min;
    this.options.max = max;
    this.options.format = format;
    super.init();
  }

  protected geometryParser(dim, type) {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected getStyleMix(valueText) {
    const { liquidStyle = {} } = this.options;
    const { width, height } = this;
    const size = Math.min(width, height) / 1.2 - Object.assign({ borderWidth: 10 }, liquidStyle).borderWidth;
    const defaultStyle = Object.assign({}, this.theme, {
      fontSize: this.autoFontSize(size, valueText),
      size,
    });
    return Object.assign(defaultStyle, liquidStyle);
  }

  protected scale() {
    const { min, max, format } = this.options;
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
    this.setConfig('scales', scales);
    super.scale();
  }

  protected coord() {}

  protected axis() {
    const axesConfig = {
      fields: {
        value: false,
        '1': false,
      },
    };
    this.setConfig('axes', axesConfig);
  }

  protected addGeometry() {
    const { styleMix = {} } = this.options;

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

    this.setConfig('element', liquid);
  }

  protected annotation() {
    const props = this.options;
    if (props.showValue === false) {
      return;
    }

    const { valueText, styleMix } = this.options;
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
    this.setConfig('annotations', annotationConfigs);
  }

  protected animation() {}

  private percent(num: number, fixed: number = 2): string {
    if (isNaN(num)) {
      return `${num}`;
    }
    return `${(num * 100).toFixed(fixed)}%`.replace(/\.0*%/, '%');
  }

  private valueText(type, value, format, min, max) {
    if (type === 'percent') {
      if (max - min === 0) {
        return '--';
      }
      const percentValue = (value - min) / (max - min);
      return typeof value === 'number' ? format(this.percent(percentValue), percentValue) : '--';
    }
    return typeof value === 'number' ? format(value) : '--';
  }

  private autoFontSize(space, text) {
    const fontSizeBySpace = space / 4;
    const fontSizeByText = (space / text.length) * 1.5;
    return Math.min(fontSizeBySpace, fontSizeByText);
  }
}

registerPlotType('liquid', LiquidLayer);
