import { VIEW_LIFE_CIRCLE, Event } from '@antv/g2';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { getProgressData } from '../progress/utils';
import { RingProgressOptions } from './types';
import { adaptor, statistic } from './adaptor';
import { DEFAULT_OPTIONS } from './constants';

export type { RingProgressOptions };

export class RingProgress extends Plot<RingProgressOptions> {
  /**
   * 获取默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<RingProgressOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 图表类型 */
  public type: string = 'ring-process';

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

    this.chart.data(getProgressData(percent));
    // todo 后续让 G2 层在 afterrender 之后，来重绘 annotations
    statistic({ chart: this.chart, options: this.options }, true);

    this.chart.emit(
      VIEW_LIFE_CIRCLE.AFTER_CHANGE_DATA,
      Event.fromData(this.chart, VIEW_LIFE_CIRCLE.AFTER_CHANGE_DATA, null)
    );
  }

  protected getDefaultOptions() {
    return RingProgress.getDefaultOptions();
  }

  /**
   * 获取 环形进度图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<RingProgressOptions> {
    return adaptor;
  }
}
