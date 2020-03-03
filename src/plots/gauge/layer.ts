import { CoordinateType } from '@antv/g2/lib/plot/interface';
import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { ElementOption } from '../../interface/config';
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
  tickLabelOffset?: number[];
  colors?: string[];
  tickLabelSize?: number;
  pointerColor?: string;
}

const GAP = 1;
const RADIUS = 0.9;

export interface GaugeViewConfig extends ViewConfig {
  startAngle?: number;
  endAngle?: number;
  min?: number;
  max?: number;
  value?: number;
  showValue?: boolean;
  format?: (...args: any[]) => string;
  gaugeStyle?: GaugeStyle;
  range?: number[];
  styleMix?: any;
  valueText?: string;
  statistic?: any; // todo: 指标卡类型定义
}

export interface GaugeLayerConfig extends GaugeViewConfig, LayerConfig {}

export default class GaugeLayer extends ViewLayer<GaugeLayerConfig> {
  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
      startAngle: -7 / 6,
      endAngle: 1 / 6,
      range: [0, 25, 50, 75, 100],
      gaugeStyle: {
        tickLineColor: 'rgba(0,0,0,0)',
        pointerColor: '#bfbfbf',
        statisticPos: ['50%', '100%'],
      },
    });
  }

  public type: string = 'gauge';

  public init() {
    const { value, range } = this.options;
    const rangeSorted = range.map((d: number) => +d).sort((a: number, b: number) => a - b);

    const { min = rangeSorted[0], max = rangeSorted[rangeSorted.length - 1], format = (d) => `${d}` } = this.options;

    const valueText = format(value);
    const styleMix = this.getStyleMix();
    this.options.styleMix = styleMix;
    this.options.data = [{ value: value || 0 }];
    this.options.valueText = valueText;
    this.options.min = min;
    this.options.max = max;
    this.options.format = format;
    super.init();
  }

  protected geometryParser(dim: string, type: string): string {
    throw new Error('Method not implemented.');
  }

  protected getStyleMix() {
    const { gaugeStyle = {} } = this.options;
    const { width, height } = this;
    const size = Math.max(width, height) / 20;
    const defaultStyle = Object.assign({}, this.theme, {
      stripWidth: size,
      tickLabelSize: size / 2,
      statisticSize: size * 1.5,
    });
    return Object.assign(defaultStyle, gaugeStyle);
  }

  protected scale() {
    const { min, max, format, styleMix } = this.options;
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
    super.scale();
  }

  protected coord() {
    const coordConfig = {
      type: 'polar' as CoordinateType,
      cfg: {
        radius: 0.9,
        startAngle: this.options.startAngle * Math.PI,
        endAngle: this.options.endAngle * Math.PI,
      },
    };
    this.setConfig('coord', coordConfig);
  }

  protected axis() {
    const { styleMix } = this.options;

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
      labelAutoRotate: true,
    };
    axesConfig.fields['1'] = false;
    this.setConfig('axes', axesConfig);
  }

  protected addGeometry() {
    const { styleMix } = this.options;
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

  protected annotation() {
    const { min, max, statistic, range, styleMix } = this.options;
    const annotationConfigs = [];

    // @ts-ignore
    if (statistic !== false) {
      const statistics = this.renderStatistic();
      annotationConfigs.push(statistics);
    }

    const arcSize = 1; // 0.965;
    const strips = this.renderArcs(range, arcSize, styleMix);
    const allArcs = annotationConfigs.concat(strips);
    this.setConfig('annotations', allArcs);
  }

  private renderArcs(range, arcSize, styleMix) {
    const colors = styleMix.colors || this.config.theme.colors;
    const rangeArray = (d: number) => [
      ...Array(d)
        .fill(0)
        .map((data, i) => i),
    ];
    const count = range.length - 1;
    const Arcs = [];
    const Bks = [];
    const countArray = rangeArray(count);
    _.each(countArray, (index) => {
      const gap = index === countArray.length - 1 ? 0 : this.calGapAngle();
      const arc = {
        type: 'arc',
        start: [range[index], arcSize],
        end: [range[index + 1] - gap, arcSize],
        style: {
          stroke: colors[index % colors.length],
          lineWidth: styleMix.stripWidth,
        },
      };
      const base = _.deepMix({}, arc, {
        style: {
          stroke: styleMix.stripBackColor,
        },
      });
      Bks.push(base);
      Arcs.push(arc);
    });
    // 如果range不以0为起始
    if (range[0] !== 0) {
      Bks.push({
        type: 'arc',
        start: [0, arcSize],
        end: [range[0] - this.calGapAngle(), arcSize],
        style: {
          stroke: styleMix.stripBackColor,
          lineWidth: styleMix.stripWidth,
        },
      });
    }
    // 如果range不以100为结束
    if (range[range.length - 1] !== 100) {
      Bks.push({
        type: 'arc',
        start: [range[range.length - 1] + this.calGapAngle(), arcSize],
        end: [100, arcSize],
        style: {
          stroke: styleMix.stripBackColor,
          lineWidth: styleMix.stripWidth,
        },
      });
    }

    return Bks.concat(Arcs);
  }

  private statisticHtml() {
    const { value, format } = this.options;
    const statistic: any = this.options.statistic;
    const formatted: string = format(value);

    if (typeof statistic === 'boolean' && statistic === true) {
      return value !== null ? formatted : '--';
    }
    if (typeof statistic === 'string') {
      return statistic;
    }
    if (typeof statistic === 'function') {
      return statistic(value, formatted);
    }
    return null;
  }

  private renderStatistic() {
    const { statistic, styleMix } = this.options;
    const statisticHtml: string | HTMLElement | null = this.statisticHtml();

    if (typeof statistic !== 'function') {
      const text = {
        type: 'text',
        content: statisticHtml,
        top: true,
        position: styleMix.statisticPos,
        style: {
          fill: styleMix.statisticColor,
          fontSize: styleMix.statisticSize,
          textAlign: 'center',
        },
      };
      return text;
    }

    if (typeof statistic === 'function') {
      const html = {
        type: 'html',
        zIndex: 10,
        position: styleMix.statisticPos,
        html: statisticHtml,
      };
      return html;
    }
  }

  private calGapAngle() {
    const ratio = (Math.abs(this.options.startAngle - this.options.endAngle) / Math.PI) * 100;
    const radius = (this.width / 2) * RADIUS;
    return (GAP / radius) * ratio;
  }
}

registerPlotType('gauge', GaugeLayer);
