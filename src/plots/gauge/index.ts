import { CoordinateType } from '@antv/g2/lib/plot/interface';
import * as _ from '@antv/util';

import BasePlot from '../../base/plot';
import BaseConfig, { ElementOption } from '../../interface/config';
import { extractScale } from '../../util/scale';

import './element/shape/pointer';

interface GaugeStyle {
  fontColor?: string;
  fontOpacity?: number;
  fontSize?: number;
  borderOpacity?: number;
  borderWidth?: number;
  size?: number;
}

export interface GaugeConfig extends BaseConfig {
  type?: 'normal' | 'percent';
  min?: number;
  max?: number;
  value?: number;
  showValue?: boolean;
  format?: (...args: any[]) => string;
  gaugeStyle?: GaugeStyle;
}

export default class Gauge extends BasePlot<GaugeConfig> {
  constructor(container: string | HTMLElement, config: GaugeConfig) {
    super(container, config);
  }

  protected _beforeInit() {
    this.type = 'gauge';
  }

  protected _getStyleMix() {
    const { gaugeStyle = {} } = this._initialProps;
    const { width, height } = this._config.panelRange;
    const size = Math.max(width, height) / 20;
    const defaultStyle = Object.assign({}, this.plotTheme, {
      stripWidth: size,
      tickLabelSize: size / 2,
      labelSize: size * 1.5,
    });
    return Object.assign(defaultStyle, gaugeStyle);
  }

  protected _setDefaultG2Config() {
    const { value, range } = this._initialProps;
    const rangeSorted = range.map((d: number) => +d).sort((a: number, b: number) => a - b);

    const {
      min = rangeSorted[0],
      max = rangeSorted[rangeSorted.length - 1],
      format = (d) => `${d}`,
    } = this._initialProps;

    const valueText = format(value);
    const styleMix = this._getStyleMix();
    this._initialProps.styleMix = styleMix;
    this._initialProps.data = [{ value: value || 0 }];
    this._initialProps.valueText = valueText;
    this._initialProps.min = min;
    this._initialProps.max = max;
    this._initialProps.format = format;
  }

  protected _scale() {
    const { min, max, format, styleMix } = this._initialProps;
    const scales = {
      value: {},
    };
    extractScale(scales.value, {
      min,
      max,
      minLimit: min,
      maxLimit: max,
      nice: true,
      formatter: format,
      // 自定义 tick step
      tickInterval: styleMix.tickInterval,
    });
    // @ts-ignore
    this._setConfig('scales', scales);
    super._scale();
  }

  protected _coord() {
    const coordConfig = {
      type: 'polar' as CoordinateType,
      cfg: {
        radius: 0.9,
        startAngle: (-7 / 6) * Math.PI,
        endAngle: (1 / 6) * Math.PI,
      },
    };
    this._setConfig('coord', coordConfig);
  }

  protected _axis() {
    const { styleMix } = this._initialProps;

    const offset =
      typeof styleMix.tickLabelPos === 'number'
        ? -styleMix.tickLabelPos
        : styleMix.tickLabelPos === 'outer'
        ? 0.8
        : -0.8;

    const axesConfig = {
      fields: {
        value: {},
        1: {},
      },
    };
    axesConfig.fields.value = {
      line: null,
      label: {
        offset: offset * (styleMix.stripWidth / 1.8 + styleMix.tickLabelSize / 1.5),
        textStyle: {
          fontSize: styleMix.tickLabelSize,
          fill: styleMix.tickLabelColor,
          textAlign: 'center',
          textBaseline: 'middle',
        },
      },
      tickLine: {
        length: offset * (styleMix.stripWidth + 4),
        stroke: styleMix.tickLineColor,
        lineWidth: 2,
        // 由于tickline的zindex在annotation之上，所以使用lineDash实现offset
        lineDash: [0, styleMix.stripWidth / 2, Math.abs(offset * (styleMix.stripWidth + 4))],
      },
      subTickCount: styleMix.subTickCount,
      subTickLine: {
        length: offset * (styleMix.stripWidth + 1),
        stroke: styleMix.tickLineColor,
        lineWidth: 1,
        lineDash: [0, styleMix.stripWidth / 2, Math.abs(offset * (styleMix.stripWidth + 1))],
      },
    };
    axesConfig.fields['1'] = false;
    this._setConfig('axes', axesConfig);
  }

  protected _addElements() {
    const { styleMix } = this._initialProps;
    const pointerColor = styleMix.pointerColor || this._config.theme.defaultColor;

    const pointer: ElementOption = {
      type: 'point',
      position: {
        fields: ['value', '1'],
      },
      shape: {
        values: ['pointer'],
      },
      color: {
        values: [pointerColor],
      },
    };

    this._setConfig('element', pointer);
  }

  protected _interactions() {}

  protected _annotation() {
    const { min, max, label, range, styleMix } = this._initialProps;
    const annotationConfigs = [];

    // @ts-ignore
    if (label !== false) {
      const labels = this._renderLabel();
      annotationConfigs.push(labels);
    }

    const arcSize = 1; // 0.965;
    const bg = {
      type: 'arc',
      start: [min, arcSize],
      end: [max, arcSize],
      style: {
        stroke: styleMix.stripBackColor,
        lineWidth: styleMix.stripWidth,
      },
    };
    annotationConfigs.push(bg);
    const strips = this._renderArcs(range, arcSize, styleMix);
    const allArcs = annotationConfigs.concat(strips);
    this._setConfig('annotations', allArcs);
  }

  protected _animation() {}

  private _renderArcs(range, arcSize, styleMix) {
    const colors = styleMix.colors || this._config.theme.colors;
    const rangeArray = (d: number) => [
      ...Array(d)
        .fill(0)
        .map((data, i) => i),
    ];
    const count = range.length - 1;
    const Arcs = rangeArray(count).map((index) => ({
      type: 'arc',
      start: [range[index], arcSize],
      end: [range[index + 1], arcSize],
      style: {
        stroke: colors[index % colors.length],
        lineWidth: styleMix.stripWidth,
      },
    }));
    return Arcs;
  }

  private _labelText() {
    const { value, format } = this._initialProps;
    const label: any = this._initialProps.label;
    const formatted: string = format(value);

    if (typeof label === 'boolean' && label === true) {
      return value !== null ? formatted : '--';
    }
    if (typeof label === 'string') {
      return label;
    }
    if (typeof label === 'function') {
      return label(value, formatted);
    }
    return null;
  }

  private _renderLabel() {
    const { label, styleMix } = this._initialProps;

    const labelText: string | null = this._labelText();

    if (typeof label !== 'function') {
      const text = {
        type: 'text',
        content: labelText,
        top: true,
        position: styleMix.labelPos,
        style: {
          fill: styleMix.labelColor,
          fontSize: styleMix.labelSize,
          textAlign: 'center',
        },
      };
      return text;
    }

    if (typeof label === 'function') {
      const html = {
        type: 'html',
        zIndex: 10,
        position: styleMix.labelPos,
        html: labelText,
      };
      return html;
    }
  }
}
