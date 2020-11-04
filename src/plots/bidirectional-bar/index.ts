import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { deepAssign } from '../../utils';
import { BidirectionalBarOptions } from './types';
import { adaptor } from './adaptor';

export { BidirectionalBarOptions };

export class BidirectionalBar extends Plot<BidirectionalBarOptions> {
  /** 图表类型 */
  public type: string = 'bidirectional-bar';

  protected getDefaultOptions() {
    return deepAssign({}, super.getDefaultOptions());
  }

  /**
   * 获取对称条形图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<BidirectionalBarOptions> {
    return adaptor;
  }
}
