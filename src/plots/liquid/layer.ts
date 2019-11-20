import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { ElementOption } from '../../interface/config';
import { extractScale } from '../../util/scale';

import { LayerConfig } from '../../base/layer';
import './geometry/shape/liquid';
import './theme';

interface LiquidStyle {
  color?: string | string[];
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

export interface LiquidViewConfig extends ViewConfig {
  statistic?: string;
  min?: number;
  max?: number;
  value?: number;
  showValue?: boolean;
  format?: (...args: any[]) => string;
  liquidStyle?: LiquidStyle;
  styleMix?: any;
  text?: number;
}

export interface LiquidLayerConfig extends LiquidViewConfig, LayerConfig {}

export default class LiquidLayer extends ViewLayer<LiquidLayerConfig> {
  public type: string = 'liquid';

  public init() {
    const { value, statistic = 'normal' } = this.options;
    const { min = 0, max = 1, format = (d) => `${d}` } = this.options;
    const valueText = this.valueText(statistic, value, format, min, max);
    const styleMix = this.getStyleMix(valueText);
    this.options.styleMix = styleMix;
    this.options.data = [{ value: typeof value === 'number' && valueText !== '--' ? value : 0 }];
    this.options.text = valueText;
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
    const size = Math.min(width, height) / 1.2 - Object.assign({ borderWidth: 50 }, liquidStyle).borderWidth;
    const defaultStyle = Object.assign({}, this.theme, {
      fontSize: this.autoFontSize(size, valueText, 1.5),
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

    if (_.has(styleMix, 'color')) {
      liquid.color = {
        values: [styleMix.color],
      };
    }

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

    const { text, styleMix } = this.options;
    const annotationConfigs = [];
    const adjustStyle = this.adjustStyle();
    const textAnnotation = {
      type: 'text',
      content: text,
      top: true,
      position: ['50%', '55%'],
      style: _.deepMix(
        {},
        {
          fill: styleMix.fontColor,
          opacity: styleMix.fontOpacity,
          fontSize: styleMix.fontSize,
          textAlign: 'center',
        },
        adjustStyle
      ),
    };
    annotationConfigs.push(textAnnotation);

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

  private autoFontSize(space, text, ratio) {
    const fontSizeBySpace = space / 5;
    const fontSizeByText = (space / text.length) * ratio;
    return Math.min(fontSizeBySpace, fontSizeByText);
  }

  private adjustStyle() {
    const { max, min, value } = this.options;
    const percent = (value - min) / (max - min);
    if (percent > 0.3 && percent < 0.6) {
      return {
        stroke: 'white',
        lineWidth: 2,
      };
    } else if (percent >= 0.6) {
      return {
        fill: 'white',
        shadowBlur: 6,
        shadowColor: 'rgba(0, 0, 0, .4)',
      };
    }
    return {};
  }
}

registerPlotType('liquid', LiquidLayer);
