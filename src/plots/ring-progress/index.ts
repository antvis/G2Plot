import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { RingProgressOptions } from './types';
import { adaptor } from './adaptor';

export { RingProgressOptions };

export class RingProgress extends Plot<RingProgressOptions> {
  /** 图表类型 */
  public type: string = 'ring-process';

  protected getDefaultOptions() {
    return {
      percent: 0.2,
      innerRadius: 0.8,
      radius: 0.98,
      color: ['#FAAD14', '#E8EDF3'],
    };
  }

  /**
   * 获取 环形进度图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<RingProgressOptions> {
    return adaptor;
  }
}
