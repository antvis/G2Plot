import { Plot } from '../../core/plot';
import { ProgressOptions } from './types';
import { adaptor } from './adaptor';
import { Adaptor } from '../../core/adaptor';

export { ProgressOptions };

export class Progress extends Plot<ProgressOptions> {
  /** 图表类型 */
  public type: string = 'process';

  /**
   * 获取 进度图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<ProgressOptions> {
    return adaptor;
  }
}
