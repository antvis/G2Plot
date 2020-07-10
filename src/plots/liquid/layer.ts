import { deepMix, isFunction, get, forIn, isNumber } from '@antv/util';
import { modifyCSS } from '@antv/dom-util';
import BBox from '../../util/bbox';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getGeom } from '../../geoms/factory';
import { extractScale } from '../../util/scale';
import { DataItem, TextStyle } from '../../interface/config';
import { rgb2arr } from '../../util/color';
import LiquidStatistic from './component/liquid-statistic';
import * as EventParser from './event';
import './geometry/shape/liquid';
import './animation/liquid-move-in';

const G2_GEOM_MAP = {
  column: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'liquid',
};

export interface LiquidStyle {}

interface LiquidStatisticStyle {
  visible?: boolean;
  formatter?: (value) => string;
  style?: TextStyle;
  adjustColor?: boolean;
  htmlContent?: (...args: any) => string;
}

export interface LiquidViewConfig extends Partial<ViewConfig> {
  statistic?: LiquidStatisticStyle;
  liquidSize?: number;
  min: number;
  max: number;
  value: number;
  liquidStyle?: LiquidStyle | ((...args: any[]) => LiquidStyle);
}

export interface LiquidLayerConfig extends LiquidViewConfig, LayerConfig {
  data: DataItem[];
}

export default class LiquidLayer<T extends LiquidLayerConfig = LiquidLayerConfig> extends ViewLayer<T> {
  private statistic: any; // 保存指标卡实例用于响应交互

  public static getDefaultOptions(): Partial<LiquidViewConfig> {
    const cfg: Partial<LiquidViewConfig> = {
      padding: [0, 0, 0, 0],
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
      statistic: {
        visible: true,
      },
    };
    return deepMix({}, super.getDefaultOptions(), cfg);
  }

  public liquid: any;
  public type: string = 'liquid';
  private shouldFadeInAnnotation: boolean = true;

  public beforeInit() {
    const { min, max, value } = this.options;
    if (!isNumber(min)) {
      throw new Error('The min value of Liquid is required, and the type of min must be Number.');
    }
    if (!isNumber(max)) {
      throw new Error('The max value of Liquid is required, and the type of max must be Number.');
    }
    if (!isNumber(value)) {
      throw new Error('The value of Liquid is required, and the type of value must be Number.');
    }
  }

  public init() {
    this.options.data = [{}];
    super.init();
  }

  protected coord() {
    return;
  }

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
    const viewRange = this.getViewRange();
    const defaultSize = Math.min(viewRange.width, viewRange.height) * 0.8;
    const liquidSize = this.options.liquidSize ? this.options.liquidSize : defaultSize;
    liquid.size = { values: [liquidSize] };
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

  // 新增 htmlContent 支持，兼容旧功能
  protected useHtmlContent(): boolean {
    const props = this.options;
    const statistic: any = props.statistic || {};
    return isFunction(statistic.htmlContent);
  }

  protected extractStatistic() {
    if (this.useHtmlContent()) {
      return;
    }
    const props = this.options;
    const statistic: any = props.statistic || {};

    let content;
    if (isFunction(statistic.formatter)) {
      content = statistic.formatter(props.value);
    } else {
      content = `${props.value}`;
    }

    let fontSize;
    let shadowBlur;
    if (content) {
      const contentWidth = Math.min(this.width, this.height);
      fontSize = (contentWidth / content.length) * 0.5;
      shadowBlur = Math.max(1, Math.ceil(0.025 * fontSize));
    }
    let opacity;
    if (statistic.visible === false) {
      return;
    }

    const statisticConfig = deepMix(
      {
        style: {
          fontSize,
          shadowBlur,
        },
      },
      {
        top: true,
        content,
        type: 'text',
        position: ['50%', '50%'],
        style: {
          opacity,
          fill: 'transparent',
          shadowColor: 'transparent',
          textAlign: 'center',
        },
      },
      statistic
    );
    delete statisticConfig.visible;
    delete statisticConfig.formatter;
    delete statisticConfig.adjustColor;
    return statisticConfig;
  }

  protected parseEvents() {
    super.parseEvents(EventParser);
  }

  public afterRender() {
    if (this.options.statistic?.visible && !this.useHtmlContent()) {
      this.fadeInAnnotation();
    }
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
    if (this.useHtmlContent()) {
      const container = this.canvas.get('container');
      if (this.statistic) {
        container.removeChild(this.statistic.wrapperNode);
      }
      /**图中心文本 */
      if (this.options.statistic && this.options.statistic.visible) {
        const container = this.canvas.get('container');
        modifyCSS(container, { position: 'relative' });
        this.statistic = new LiquidStatistic({
          container,
          view: this.view,
          plot: this,
          ...this.options.statistic,
        });
        this.statistic.render();
      }
      super.afterRender();
    }
  }

  protected processData(): DataItem[] | undefined {
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
    const animation: any = props.animation || {};
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
      const waveColor = this.options.color as string;
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
