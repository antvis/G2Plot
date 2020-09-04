import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { TinyLineOptions } from './types';
import { adaptor } from './adaptor';

export { TinyLineOptions };

export class TinyLine extends Plot<TinyLineOptions> {
  /** 图表类型 */
  public type: string = 'tiny-line';

  /**
   * 获取 迷你折线图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<TinyLineOptions> {
    return adaptor;
  }
}
