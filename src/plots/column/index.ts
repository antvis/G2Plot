import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { ColumnOptions } from './types';
import { adaptor } from './adaptor';

export { ColumnOptions };

/**
 * 柱形图
 */
export class Column extends Plot<ColumnOptions> {
  /** 图表类型 */
  public readonly type: string = 'column';

  /**
   * 获取 柱形图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<ColumnOptions> {
    return adaptor;
  }
}
