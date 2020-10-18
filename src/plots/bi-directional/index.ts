import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { BidirectionalOptions } from './types';
import { adaptor } from './adaptor';

export { BidirectionalOptions };

export class Bidirectional extends Plot<BidirectionalOptions> {
  /** 图表类型 */
  public type: string = 'Bidirectional';

  /**
   * 获取对称条形图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<BidirectionalOptions> {
    return adaptor;
  }
}
