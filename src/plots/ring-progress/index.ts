import { Plot } from '../../core/plot';
import { RingProgressOptions } from './types';
import { adaptor } from './adaptor';
import { Adaptor } from '../../core/adaptor';

export { RingProgressOptions };

export class RingProgress extends Plot<RingProgressOptions> {
  /** 图表类型 */
  public type: string = 'process';

  /**
   * 获取 环形进度图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<RingProgressOptions> {
    return adaptor;
  }
}
