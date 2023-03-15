import { Plot } from '../../core/plot';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';
import { ColumnOptions } from './type';

export type { ColumnOptions };

export class Column extends Plot<ColumnOptions> {
  /** 图表类型 */
  public type = 'column';

  /**
   * 获取 折线图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<ColumnOptions> {
    return { type: 'interval' };
  }

  /**
   * 获取 折线图 默认配置
   */
  protected getDefaultOptions() {
    return Column.getDefaultOptions();
  }

  /**
   * 折线图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<ColumnOptions>) => void {
    return adaptor;
  }
}
