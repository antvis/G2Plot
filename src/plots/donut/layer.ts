import { modifyCSS } from '@antv/dom-util';
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

export interface DonutViewConfig extends PieViewConfig {
  innerRadius?: number;
  /** 指标卡用于显示总计值和各项数据 */

  statistic?: {
    visible: boolean;
    /** 指标卡 总计值 标签 */
    totalLabel: string;
    /** 触发显示的事件 */
    triggerOn: 'mouseenter';
    /** 触发隐藏的事件 */
    triggerOff: 'mouseleave';
    content?: string;
    htmlContent?: (...args: any) => any;
  };
}

export interface DonutLayerConfig extends DonutViewConfig, LayerConfig {}

const G2_GEOM_MAP = {
  ring: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'ring',
};

export default class DonutLayer<T extends DonutLayerConfig = DonutLayerConfig> extends PieLayer<T> {
  public static centralId = 0;
  public type: string = 'donut';
  private statistic: any; // 保存指标卡实例用于响应交互
  private statisticClass: string; // 指标卡的class,用于重点文本容器的唯一标识，一个页面多个环图时，共用 class 交互会有问题。

  public static getDefaultOptions(): any {
    return deepMix({}, super.getDefaultOptions(), {
      radius: 0.6,
      innerRadius: 0.64,
      statistic: {
        visible: true,
        totalLabel: '总计',
        triggerOn: 'mouseenter',
        triggerOff: 'mouseleave',
      },
    });
  }

  public beforeInit() {
    super.beforeInit();
    DonutLayer.centralId++;
    this.statisticClass = `statisticClassId${DonutLayer.centralId}`;
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
    const container = this.canvas.get('container');
    if (this.statistic) {
      container.removeChild(this.statistic.wrapperNode);
    }
    /**环图中心文本 */
    if (this.options.statistic && this.options.statistic.visible) {
      const container = this.canvas.get('container');
      modifyCSS(container, { position: 'relative' });
      this.statistic = new RingStatistic({
        container,
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

registerPlotType('donut', DonutLayer);
