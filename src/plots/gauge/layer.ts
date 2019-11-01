import { CoordinateType } from '@antv/g2/lib/plot/interface';
import * as _ from '@antv/util';
import ViewLayer from '../../base/view-layer';
import BaseConfig, { ElementOption } from '../../interface/config';
import { extractScale } from '../../util/scale';
import './geometry/shape/pointer';
import './theme';

interface GaugeStyle {
  fontColor?: string;
  fontOpacity?: number;
  fontSize?: number;
  borderOpacity?: number;
  borderWidth?: number;
  size?: number;
}

export interface GaugeLayerConfig extends BaseConfig {
  // type?: 'normal' | 'percent';
  min?: number;
  max?: number;
  value?: number;
  showValue?: boolean;
  format?: (...args: any[]) => string;
  gaugeStyle?: GaugeStyle;
}

export default class GaugeLayer extends ViewLayer<GaugeLayerConfig> {
  protected geometryParser(dim: string, type: string): string {
    throw new Error('Method not implemented.');
  }

  protected setType(): void {
    this.type = 'gauge';
  }

  protected _getStyleMix() {
    const { gaugeStyle = {} } = this.initialProps;
    const { width, height } = this.config.panelRange;
    const size = Math.max(width, height) / 20;
    const defaultStyle = Object.assign({}, this.plotTheme, {
      stripWidth: size,
      tickLabelSize: size / 2,
      labelSize: size * 1.5,
    });
    return Object.assign(defaultStyle, gaugeStyle);
  }

  protected _setDefaultG2Config() {
    const { value, range } = this.initialProps;
    const rangeSorted = range.map((d: number) => +d).sort((a: number, b: number) => a - b);

    const {
      min = rangeSorted[0],
      max = rangeSorted[rangeSorted.length - 1],
      format = (d) => `${d}`,
    } = this.initialProps;

    const valueText = format(value);
    const styleMix = this._getStyleMix();
    this.initialProps.styleMix = styleMix;
    this.initialProps.data = [{ value: value || 0 }];
    this.initialProps.valueText = valueText;
    this.initialProps.min = min;
    this.initialProps.max = max;
    this.initialProps.format = format;
  }

  protected _scale() {
    const { min, max, format, styleMix } = this.initialProps;
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
    this.setConfig('scales', scales);
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
    this.setConfig('coord', coordConfig);
  }

  protected _axis() {
    const { styleMix } = this.initialProps;

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
    this.setConfig('axes', axesConfig);
  }

  protected _addGeometry() {
    const { styleMix } = this.initialProps;
    const pointerColor = styleMix.pointerColor || this.config.theme.defaultColor;

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
      animate: false,
    };

    this.setConfig('element', pointer);
  }

  protected _annotation() {
    const { min, max, label, range, styleMix } = this.initialProps;
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
    this.setConfig('annotations', allArcs);
  }

  protected _animation() {}

  private _renderArcs(range, arcSize, styleMix) {
    const colors = styleMix.colors || this.config.theme.colors;
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

  private _labelHtml() {
    const { value, format } = this.initialProps;
    const label: any = this.initialProps.label;
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
    const { label, styleMix } = this.initialProps;
    const labelHtml: string | HTMLElement | null = this._labelHtml();

    if (typeof label !== 'function') {
      const text = {
        type: 'text',
        content: labelHtml,
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
        html: labelHtml,
      };
      return html;
    }
  }
}
