import { Plot } from '../../core/plot';
import { AreaOptions } from './types';
import { adaptor } from './adaptor';
import { Adaptor } from '../../core/adaptor';

export { AreaOptions };

export class Area extends Plot<AreaOptions> {
  /** 图表类型 */
  public type: string = 'line';

  /**
   * 获取 折线图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<AreaOptions> {
    return adaptor;
  }
}
