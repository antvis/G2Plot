/**
 * @author linhuiw
 * @description 仪表盘 layer
 */
import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer from '../../base/view-layer';
import { ElementOption } from '../../interface/config';
import { extractScale } from '../../util/scale';
import './theme';
import { GaugeViewConfig, DEFAULT_GAUGE_CONFIG } from './options';
import { GaugeShape } from './geometry/shape/gauge-shape';
import { getOptions } from './geometry/shape/options';

export interface GaugeLayerConfig extends GaugeViewConfig, LayerConfig {}

export default class GaugeLayer<T extends GaugeLayerConfig = GaugeLayerConfig> extends ViewLayer<T> {
  data: [];

  gaugeShape: any;

  options: any;

  constructor(props) {
    super(props);
  }

  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), DEFAULT_GAUGE_CONFIG);
  }

  public type: string = 'gauge';

  public init() {
    const { value, range } = this.options;
    const rangeSorted = (range || []).map((d: number) => +d).sort((a: number, b: number) => a - b);

    const { min = rangeSorted[0], max = rangeSorted[rangeSorted.length - 1], format = (d) => `${d}` } = this.options;

    const valueText = format(value);
    const styleMix = this.getStyleMix();
    this.options.styleMix = styleMix;
    this.options.data = [{ value: value || 0 }];
    this.options.valueText = valueText;
    this.options.min = min;
    this.options.max = max;
    this.options.format = format;
    this.initG2Shape();
    super.init();
  }

  protected getStyleMix() {
    const { gaugeStyle = {}, statistic = {} } = this.options;
    const { width, height } = this;
    const size = Math.max(width, height) / 20;
    const defaultStyle = Object.assign({}, this.theme, {
      stripWidth: size,
      tickLabelSize: size / 2,
    });
    if (!statistic.size) {
      statistic.size = size * 1.2;
    }
    const style = _.deepMix({}, defaultStyle, gaugeStyle, { statistic });
    return style;
  }

  /**
   * 绘制指针
   */
  protected initG2Shape() {
    this.gaugeShape = new GaugeShape(_.uniqueId());

    const { style } = this.options;
    this.gaugeShape.setOption(
      this.type,
      this.options,
      this.getCustomStyle().pointerStyle,
      this.getCustomStyle().ringStyle
    );
    this.gaugeShape.render();
  }

  protected getCustomStyle() {
    const { theme, styleMix } = this.options;
    const colors = styleMix.colors || this.config.theme.colors;

    return getOptions('standard', theme, colors);
  }

  protected geometryParser(dim: string, type: string): string {
    throw new Error('Method not implemented.');
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
    const coordConfig: any = {
      type: 'polar',
      cfg: {
        radius: 1,
        startAngle: this.options.startAngle * Math.PI,
        endAngle: this.options.endAngle * Math.PI,
      },
    };
    this.setConfig('coordinate', coordConfig);
  }

  protected axis() {
    const { styleMix, style } = this.options;
    const { thickness } = this.getCustomStyle().ringStyle;

    const offset =
      typeof styleMix.tickLabelPos === 'number'
        ? -styleMix.tickLabelPos
        : styleMix.tickLabelPos === 'outer'
        ? 0.8
        : -0.8;

    const axesConfig: any = {};

    axesConfig.value = {
      line: null,
      grid: null,
      label: {
        offset: offset * (styleMix.stripWidth + styleMix.tickLabelSize + thickness),
        textStyle: {
          fontSize: styleMix.tickLabelSize,
          fill: styleMix.tickLabelColor,
          textAlign: 'center',
          textBaseline: 'middle',
        },
      },
      tickLine: null,
      subTickCount: styleMix.subTickCount,
      subTickLine: {
        length: offset * (styleMix.stripWidth + 1),
        stroke: styleMix.tickLineColor,
        lineWidth: 1,
        lineDash: [0, styleMix.stripWidth / 2, Math.abs(offset * (styleMix.stripWidth + 1))],
      },
      labelAutoRotate: true,
    };
    axesConfig['1'] = false;
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
        values: ['gauge'],
      },
      color: {
        values: [pointerColor],
      },
    };

    this.setConfig('geometry', pointer);
  }

  protected annotation() {
    const { statistic, style } = this.options;
    const annotationConfigs = [];
    // @ts-ignore
    if (statistic && statistic.visible) {
      const statistics = this.renderStatistic();
      annotationConfigs.push(statistics);
    }
    this.setConfig('annotations', annotationConfigs);
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

  protected renderStatistic() {
    const { statistic, styleMix } = this.options;
    // const statisticHtml: string | HTMLElement | null = this.statisticHtml();
    const text = {
      type: 'text',
      content: statistic.text,
      top: true,
      position: styleMix.statistic.position,
      style: {
        fill: styleMix.statistic.color,
        fontSize: styleMix.statistic.size,
        textAlign: 'center',
        textBaseline: 'middle',
      },
    };
    return text;
  }
}

registerPlotType('gauge', GaugeLayer);
