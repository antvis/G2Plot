import { Plot } from '../../core/plot';
import { TinyAreaOptions } from './types';
import { adaptor } from './adaptor';
import { Adaptor } from '../../core/adaptor';

export { TinyAreaOptions };

export class TinyLine extends Plot<TinyAreaOptions> {
  /** 图表类型 */
  public type: string = 'tiny-line';

  /**
   * 获取 迷你折线图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<TinyAreaOptions> {
    return adaptor;
  }
}
