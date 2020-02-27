import { deepMix, each } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import PieLayer, { PieViewConfig } from '../pie/layer';
import responsiveMethods from './apply-responsive';
import './apply-responsive/theme';
import * as EventParser from './event';
import { LooseMap } from '../../interface/types';
import RingStatistic from './component/ring-statistic';
import { getPieLabel } from '../pie/component/label';

export interface RingViewConfig extends PieViewConfig {
  innerRadius?: number;
  statistic?: any; //FIXME: 指标卡
}

export interface RingLayerConfig extends RingViewConfig, LayerConfig {}

const G2_GEOM_MAP = {
  ring: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'ring',
};

export default class RingLayer<T extends RingLayerConfig = RingLayerConfig> extends PieLayer<T> {
  public static centralId = 0;
  public type: string = 'ring';
  private statistic: any; // 保存指标卡实例用于响应交互
  private statisticClass: string; // 指标卡的class,用于重点文本容器的唯一标识，一个页面多个环图时，共用 class 交互会有问题。

  public static getDefaultOptions(): any {
    return deepMix({}, super.getDefaultOptions(), {
      radius: 0.6,
      innerRadius: 0.64,
      statistic: {
        visible: true,
        triggerOn: 'mouseenter',
        triggerOff: 'mouseleave',
      },
    });
  }

  public getOptions(props: T) {
    const options = super.getOptions(props);
    // @ts-ignore
    const defaultOptions = this.constructor.getDefaultOptions();
    return deepMix({}, options, defaultOptions, props);
  }

  public beforeInit() {
    super.beforeInit();
    RingLayer.centralId++;
    this.statisticClass = `statisticClassId${RingLayer.centralId}`;
    this.adjustLabelDefaultOptions();
    if (this.options.statistic && this.options.statistic.triggerOn) {
      this.options.tooltip.visible = false;
    }
    /** 响应式图形 */
    if (this.options.responsive && this.options.padding !== 'auto') {
      this.applyResponsive('preRender');
    }
  }

  public afterRender() {
    const options = this.options;
    /**环图中心文本 */
    if (this.options.statistic && this.options.statistic.visible) {
      this.statistic = new RingStatistic({
        container: this.canvas.get('container'),
        view: this.view,
        plot: this,
        statisticClass: this.statisticClass,
        ...this.options.statistic,
      });
      this.statistic.render();
      /**响应交互 */
      if (this.options.statistic.triggerOn) {
        //this.triggerOnStatistic();
        this.statistic.triggerOn();
      }
    }
    if (options.label && options.label.visible) {
      const LabelCtor = getPieLabel(options.label.type);
      const label = new LabelCtor(this, options.label);
      label.render();
    }
  }

  public destroy() {
    if (this.statistic) {
      this.statistic.destroy();
    }
    super.destroy();
  }

  protected geometryParser(dim, type) {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected coord() {
    const props = this.options;
    const coordConfig: any = {
      type: 'theta',
      cfg: {
        radius: props.radius,
        innerRadius: props.innerRadius,
      },
    };
    this.setConfig('coordinate', coordConfig);
  }

  protected parseEvents(eventParser) {
    super.parseEvents(EventParser);
  }

  private applyResponsive(stage) {
    const methods = responsiveMethods[stage];
    each(methods, (r) => {
      const responsive = r as LooseMap;
      responsive.method(this);
    });
  }

  /** @override 调整 label 默认 options */
  protected adjustLabelDefaultOptions() {
    const labelConfig = this.options.label;
    if (labelConfig && labelConfig.type === 'inner') {
      const labelStyleConfig = (labelConfig.style || {}) as LooseMap;
      if (!labelStyleConfig.textAlign) {
        labelStyleConfig.textAlign = 'center';
      }
      labelConfig.style = labelStyleConfig;
      if (!labelConfig.offset) {
        labelConfig.offset = `${((this.options.innerRadius - 1) / 2) * 100}%`;
      }
    }
  }
}

registerPlotType('ring', RingLayer);
