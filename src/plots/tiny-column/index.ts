import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { TinyColumnOptions } from './types';
import { adaptor } from './adaptor';

export { TinyColumnOptions };

export class TinyColumn extends Plot<TinyColumnOptions> {
  /** 图表类型 */
  public type: string = 'tiny-column';

  /**
   * 获取 迷你柱形图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<TinyColumnOptions> {
    return adaptor;
  }
}
