import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { ElementOption } from '../../interface/config';
import { extractScale } from '../../util/scale';
import './theme';
import { GaugeViewConfig, DEFAULT_GAUGE_CONFIG } from './options';
import { GaugeShape } from './geometry/shape/gauge-shape';
import { getOptions } from './geometry/shape/options';
import { CoordinateType } from '@antv/g2/lib/plot/interface';

export interface GaugeLayerConfig extends GaugeViewConfig, LayerConfig {}

export default class GaugeLayer extends ViewLayer<GaugeLayerConfig> {
  data: [];

  gaugeShape: any;

  options: any;

  constructor(props) {
    super(props);
    this.initG2Shape();
  }

  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), DEFAULT_GAUGE_CONFIG);
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

  /**
   * 绘制指针
   */
  initG2Shape() {
    this.gaugeShape = new GaugeShape(_.uniqueId());

    const { style } = this.options;
    this.gaugeShape.setOption(
      this.options,
      this.getCustomStyle(style).pointerStyle,
      this.getCustomStyle(style).ringStyle,
    );
    this.gaugeShape.render();
  }

  private getCustomStyle(style: string) {
    const { theme, colors } = this.options;
    let options;
    switch (style) {
      case 'meter':
        options = getOptions(style, theme, colors);
      case 'fan':
        options = getOptions(style, theme, colors);
      case 'standard':
      default:
        options = getOptions(style, theme, colors);
    }

    return options;
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
    const { styleMix, style } = this.options;
    const { thickness } = this.getCustomStyle(style).ringStyle;

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
      grid: null,
      label: {
        offset: offset * (styleMix.stripWidth / 1.8 + styleMix.tickLabelSize / 1.5 + thickness / 2),
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
        values: ['gauge'],
      },
      color: {
        values: [pointerColor],
      },
      animate: false,
    };

    this.setConfig('element', pointer);
  }

}

registerPlotType('gauge', GaugeLayer);
