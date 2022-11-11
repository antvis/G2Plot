import { Event, VIEW_LIFE_CIRCLE } from '@antv/g2';
import { Adaptor } from '../../core/adaptor';
import { Plot } from '../../core/plot';
import { adaptor, statistic } from './adaptor';
import { DEFAULT_OPTIONS } from './constants';
// register liquid shape
import './shapes/liquid';
import { LiquidOptions } from './types';
import { getLiquidData } from './utils';

export { addWaterWave } from './shapes/liquid';
export type { LiquidOptions };

/**
 * 传说中的水波图
 */
export class Liquid extends Plot<LiquidOptions> {
  /**
   * 获取 饼图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<LiquidOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 图表类型 */
  public type: string = 'liquid';

  /**
   * 获取 水波图 默认配置项, 供 base 获取
   */
  protected getDefaultOptions(): Partial<LiquidOptions> {
    return Liquid.getDefaultOptions();
  }

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

    this.chart.data(getLiquidData(percent));
    statistic({ chart: this.chart, options: this.options }, true);

    this.chart.emit(
      VIEW_LIFE_CIRCLE.AFTER_CHANGE_DATA,
      Event.fromData(this.chart, VIEW_LIFE_CIRCLE.AFTER_CHANGE_DATA, null)
    );
  }

  /**
   * 获取适配器
   */
  protected getSchemaAdaptor(): Adaptor<LiquidOptions> {
    return adaptor;
  }
}
