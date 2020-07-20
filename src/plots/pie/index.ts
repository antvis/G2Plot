import { Plot } from '../../core/plot';
import { PieOptions } from './types';
import { adaptor } from './adaptor';
import { Adaptor } from '../../core/adaptor';
import './interaction';

export { PieOptions };

export class Pie extends Plot<PieOptions> {
  /** 图表类型 */
  public type: string = 'pie';

  /**
   * 获取 饼图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<PieOptions> {
    return adaptor;
  }
}
