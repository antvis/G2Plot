import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { LineOptions } from './types';
import { adaptor } from './adaptor';

export { LineOptions };

export class Line extends Plot<LineOptions> {
  /** 图表类型 */
  public type: string = 'line';

  /**
   * 获取 折线图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<LineOptions> {
    return adaptor;
  }
}
