import { Plot } from '../../core/plot';
import { ColumnLineOption } from './types';
import { adaptor } from './adaptor';
import { Adaptor } from '../../core/adaptor';

export { ColumnLineOption };

export class DualLine extends Plot<ColumnLineOption> {
  /** 图表类型: 双折线图 */
  public type: string = 'columnLine';

  /**
   * 获取 折线图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<ColumnLineOption> {
    return adaptor;
  }
}
