import { VIEW_LIFE_CIRCLE, Event } from '@antv/g2';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { GaugeOptions } from './types';
import { adaptor, statistic } from './adaptor';
import { INDICATEOR_VIEW_ID, RANGE_VIEW_ID, DEFAULT_OPTIONS } from './constants';
import { getIndicatorData, getRangeData } from './utils';

// 注册 shape
import './shapes/indicator';
import './shapes/meter-gauge';

export type { GaugeOptions };

/**
 * 仪表盘
 */
export class Gauge extends Plot<GaugeOptions> {
  /**
   * 获取 仪表盘 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<GaugeOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 图表类型 */
  public type: string = 'gauge';

  /**
   * 更新数据
   * @param percent
   */
  public changeData(percent: number) {
    this.chart.emit(
      VIEW_LIFE_CIRCLE.BEFORE_CHANGE_DATA,
      Event.fromData(this.chart, VIEW_LIFE_CIRCLE.BEFORE_CHANGE_DATA, null)
    );

    this.updateOption({ percent });
    const indicatorView = this.chart.views.find((v) => v.id === INDICATEOR_VIEW_ID);
    if (indicatorView) {
      indicatorView.data(getIndicatorData(percent));
    }

    const rangeView = this.chart.views.find((v) => v.id === RANGE_VIEW_ID);
    if (rangeView) {
      rangeView.data(getRangeData(percent, this.options.range));
    }
    // todo 后续让 G2 层在 afterrender 之后，来重绘 annotations
    statistic({ chart: this.chart, options: this.options }, true);

    this.chart.emit(
      VIEW_LIFE_CIRCLE.AFTER_CHANGE_DATA,
      Event.fromData(this.chart, VIEW_LIFE_CIRCLE.AFTER_CHANGE_DATA, null)
    );
  }

  /**
   * 获取默认配置
   * 供 base 使用
   */
  protected getDefaultOptions() {
    return Gauge.getDefaultOptions();
  }

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<GaugeOptions> {
    return adaptor;
  }
}
