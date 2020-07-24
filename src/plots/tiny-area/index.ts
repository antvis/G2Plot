import { Plot } from '../../core/plot';
import { TinyAreaOptions } from './types';
import { adaptor } from './adaptor';
import { Adaptor } from '../../core/adaptor';

export { TinyAreaOptions };

export class TinyArea extends Plot<TinyAreaOptions> {
  /** 图表类型 */
  public type: string = 'tiny-area';

  /**
   * 获取 迷你面积图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<TinyAreaOptions> {
    return adaptor;
  }
}
