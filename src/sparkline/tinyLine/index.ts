import { Plot } from '../../core/plot';
import { TinyLineOptions } from './types';
import { adaptor } from './adaptor';
import { Adaptor } from '../../core/adaptor';

export { TinyLineOptions };

export class TinyLine extends Plot<TinyLineOptions> {
  /** 图表类型 */
  public type: string = 'tinyLine';

  /**
   * 获取 折线图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<TinyLineOptions> {
    return adaptor;
  }
}
