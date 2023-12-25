import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';
import { TinyColumnOptions } from './type';

export type { TinyColumnOptions };

export class TinyColumn extends Plot<TinyColumnOptions> {
  /** 图表类型 */
  public type = 'TinyColumn';

  /**
   * 获取 迷你柱形图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<TinyColumnOptions> {
    return {
      type: 'view',
      children: [{ type: 'interval', axis: false }],
      autoFit: false,
      padding: 0,
      margin: 0,
      tooltip: false,
    };
  }

  /**
   * 获取 迷你柱形图 默认配置
   */
  protected getDefaultOptions() {
    return TinyColumn.getDefaultOptions();
  }

  /**
   * 迷你柱形图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<TinyColumnOptions>) => void {
    return adaptor;
  }
}
