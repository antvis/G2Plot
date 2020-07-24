import { Plot } from '../../core/plot';
import { DualLineOption } from './types';
import { adaptor } from './adaptor';
import { Adaptor } from '../../core/adaptor';

export { DualLineOption };

export class DualLine extends Plot<DualLineOption> {
  /** 图表类型: 双折线图 */
  public type: string = 'dualLine';

  /**
   * 获取 折线图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<DualLineOption> {
    return adaptor;
  }
}
