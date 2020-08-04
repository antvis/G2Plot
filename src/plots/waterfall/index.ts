import { Plot } from '../../core/plot';
import { adaptor } from './adaptor';
import { Adaptor } from '../../core/adaptor';
import { WaterfallOptions } from './types';
import './shape/shape';

export { WaterfallOptions };

export class Waterfall extends Plot<WaterfallOptions> {
  /** 图表类型 */
  public type: string = 'waterfall';

  /**
   * 获取散点图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<WaterfallOptions> {
    return adaptor;
  }
}
