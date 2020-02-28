import { deepMix, isFunction, get, forIn } from '@antv/util';
import BBox from '../../util/bbox';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getGeom } from '../../geoms/factory';
import { extractScale } from '../../util/scale';
import { DataItem } from '../../interface/config';
import { rgb2arr } from '../../util/color';
import './geometry/shape/liquid';
import './animation/liquid-move-in';

const G2_GEOM_MAP = {
  column: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'liquid',
};

export interface LiquidStyle {}

export interface LiquidViewConfig extends Partial<ViewConfig> {
  statistic?: {
    visible?: boolean;
    adjustColor?: boolean;
    style?: {};
    formatter?: (value) => string;
  };
  min: number;
  max: number;
  value: number;
  liquidStyle?: LiquidStyle | ((...args: any[]) => LiquidStyle);
  type?: string;
  showValue?: boolean;
}

export interface LiquidLayerConfig extends LiquidViewConfig, LayerConfig {
  data: DataItem[];
}

export default class LiquidLayer<T extends LiquidLayerConfig = LiquidLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): Partial<LiquidViewConfig> {
    const cfg: Partial<LiquidViewConfig> = {
      animation: {
        factor: 0.4,
        easing: 'easeExpOut',
        duration: 800,
      },
      liquidStyle: {
        lineWidth: 2,
      },
      color: '#6a99f9',
      interactions: [],
    };
    return deepMix({}, super.getDefaultOptions(), cfg);
  }

  public liquid: any;
  public type: string = 'liquid';
  private shouldFadeInAnnotation: boolean = true;

  public init() {
    this.options.data = [{}];
    super.init();
  }

  protected coord() {}

  protected scale() {
    const props = this.options;
    const { min, max } = props;
    const scales = {
      value: {},
    };
    extractScale(scales.value, {
      min: Math.min(min, max),
      max: Math.max(min, max),
    });
    // @ts-ignore
    this.setConfig('scales', scales);
    super.scale();
  }

  protected axis(): void {
    this.setConfig('axes', false);
  }

  protected adjustLiquid(liquid) {
    const { options: props } = this;

    liquid.shape = {
      values: ['liquid-fill-gauge'],
    };

    liquid.tooltip = false;

    let liquidStyle = props.liquidStyle;
    if (isFunction(liquidStyle)) liquidStyle = liquidStyle();
    if (liquidStyle) {
      liquid.style = liquidStyle;
    }
  }

  protected addGeometry(): void {
    const liquid = getGeom('interval', 'main', {
      positionFields: [1, 'value'],
      plot: this,
    });
    this.adjustLiquid(liquid);
    this.liquid = liquid;
    this.setConfig('geometry', liquid);
  }

  protected animation() {
    const props = this.options;
    if (props.animation === false) {
      /** 关闭动画 */
      this.liquid.animate = false;
    } else {
      const factor = get(props, 'animation.factor');
      const easing = get(props, 'animation.easing');
      const duration = get(props, 'animation.duration');
      this.liquid.animate = {
        appear: {
          animation: 'liquidMoveIn',
          factor,
          easing,
          duration,
        },
      };
    }
  }

  protected geometryParser(dim: string, type: string): string {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected annotation() {
    const annotationConfigs = [];

    const statisticConfig = this.extractStatistic();
    annotationConfigs.push(statisticConfig);

    this.setConfig('annotations', annotationConfigs);
  }

  protected extractStatistic() {
    const props = this.options;
    const statistic = props.statistic || {};

    let content;
    if (isFunction(statistic.formatter)) {
      content = statistic.formatter(props.value);
    } else {
      content = `${props.value}`;
    }

    let fontSize;
    let shadowBlur;
    if (content) {
      let contentWidth;
      if (props.width < props.height) {
        contentWidth = props.width * 0.8;
      } else {
        contentWidth = props.height;
      }
      fontSize = (0.8 * contentWidth) / content.length;
      shadowBlur = Math.max(1, Math.ceil(0.025 * fontSize));
    }

    let opacity;
    if (statistic.visible === false) {
      opacity = 0;
    }

    const statisticConfig = deepMix(
      {
        style: {
          fontSize,
          shadowBlur,
        },
      },
      statistic,
      {
        top: true,
        content,
        type: 'text',
        position: ['50%', '50%'],
        style: {
          opacity: 1,
          fill: 'transparent',
          shadowColor: 'transparent',
          textAlign: 'center',
        },
      }
    );

    delete statisticConfig.visible;
    delete statisticConfig.formatter;
    delete statisticConfig.adjustColor;
    return statisticConfig;
  }

  public afterRender() {
    this.fadeInAnnotation();
    const { options } = this;
    const padding = options.padding ? options.padding : this.config.theme.padding;
    /** defaultState */
    if (options.defaultState && padding !== 'auto') {
      this.stateController.defaultStates(options.defaultState);
    }
    /** autopadding */
    if (padding === 'auto') {
      this.paddingController.processAutoPadding();
    }
  }

  protected processData(data?: DataItem[]): DataItem[] | undefined {
    const props = this.options;
    return [{ _: '_', value: props.value }];
  }

  public changeValue(value: number): void {
    const props = this.options;
    props.value = value;
    this.changeData([]);
  }

  protected fadeInAnnotation() {
    const props = this.options;
    const textShape = this.view.foregroundGroup.findAll((el) => {
      return el.get('name') === 'annotation-text';
    })[0];
    const animation = props.animation || {};
    const colorStyle = this.calcAnnotationColorStyle();
    if (this.shouldFadeInAnnotation) {
      textShape.animate(colorStyle, animation.duration * Math.min(1, 1.5 * animation.factor), null, () => {
        this.shouldFadeInAnnotation = false;
      });
    } else {
      forIn(colorStyle, (v, k) => textShape.attr(k, v));
    }
  }

  protected calcAnnotationColorStyle() {
    const { options: props } = this;

    const lightColorStyle = { fill: '#f6f6f6', shadowColor: 'black' };
    const darkColorStyle = { fill: '#303030', shadowColor: 'white' };

    if (get(props, 'statistic.adjustColor') === false) {
      return {
        fill: get(props, 'statistic.style.fill', darkColorStyle.fill),
        shadowColor: get(props, 'statistic.style.shadowColor', darkColorStyle.shadowColor),
      };
    }

    let { min, max } = props;
    const { value } = props;
    min = Math.min(min, max);
    max = Math.max(min, max);
    let percent;
    if (min == max) {
      percent = 1;
    } else {
      percent = (value - min) / (max - min);
    }

    if (percent > 0.55) {
      const waveColor = this.options.color;
      const waveOpacity = 0.8;
      const rgb = rgb2arr(waveColor);
      const gray = Math.round(rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114) / waveOpacity;
      return gray < 156 ? lightColorStyle : darkColorStyle;
    }

    return darkColorStyle;
  }

  public updateConfig(cfg: Partial<T>): void {
    super.updateConfig(cfg);
    this.shouldFadeInAnnotation = true;
  }

  protected getViewRange() {
    const viewRange = super.getViewRange();
    const liquidStyle: any = this.options.liquidStyle;
    const strokeWidth = liquidStyle.lineWidth ? liquidStyle.lineWidth : 2;
    const { minX, minY, width, height } = viewRange;
    const size = Math.min(width, height) - strokeWidth * 2;
    const cx = minX + width / 2;
    const cy = minY + height / 2;
    const x = cx - size / 2;
    const y = cy - size / 2;
    return new BBox(x, y, size, size);
  }
}

registerPlotType('liquid', LiquidLayer);
