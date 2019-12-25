import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getGeom } from '../../geoms/factory';
import { extractScale } from '../../util/scale';
import './geometry/shape/liquid';
import './animation/liquid-move-in';
import { DataItem } from '../../interface/config';

const G2_GEOM_MAP = {
  column: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'liquid',
};

export interface LiquidViewConfig extends Partial<ViewConfig> {
  statistic?: {
    visible?: boolean;
    adjustColor?: boolean;
    style?: {};
    formatter?: () => string;
  };
  min: number;
  max: number;
  value: number;
}

export interface LiquidLayerConfig extends LiquidViewConfig, LayerConfig {}

export default class LiquidLayer<T extends LiquidLayerConfig = LiquidLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): Partial<LiquidViewConfig> {
    const cfg: Partial<LiquidViewConfig> = {
      animation: {
        factor: 0.4,
        easing: 'easeExpOut',
        duration: 800,
      },
    };
    return _.deepMix({}, super.getDefaultOptions(), cfg);
  }

  public liquid: any;
  public type: string = 'liquid';

  public init() {
    this.options.data = [{}];
    super.init();
  }

  protected coord(): void {}

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
  }

  protected addGeometry(): void {
    const liquid = getGeom('interval', 'main', {
      positionFields: ['_', 'value'],
      plot: this,
    });
    this.adjustLiquid(liquid);
    this.liquid = liquid;
    this.setConfig('element', liquid);
  }

  protected animation() {
    const props = this.options;
    if (props.animation === false) {
      /** 关闭动画 */
      this.liquid.animate = false;
    } else {
      const factor = _.get(props, 'animation.factor');
      const easing = _.get(props, 'animation.easing');
      const duration = _.get(props, 'animation.duration');
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

  protected processData(data?: DataItem[]): DataItem[] | undefined {
    const props = this.options;
    return [{ value: props.value }];
  }
}

registerPlotType('liquid', LiquidLayer);
