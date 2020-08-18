import { Plot } from '../../core/plot';
import { RoseOptions } from './types';
import { adaptor } from './adaptor';
import { Adaptor } from '../../core/adaptor';

export { RoseOptions };

export class Rose extends Plot<RoseOptions> {
  /** 玫瑰图 */
  public type: string = 'rose';

  /**
   * 获取 玫瑰图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<RoseOptions> {
    return adaptor;
  }
}
