import { Plot } from '../../base';

import type { Options } from '../../types/common';
import type { Adaptor } from '../../types';

export class Base extends Plot<Options> {
  /** 图表类型 */
  public type = 'base';

  /**
   * 获取 万能图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<Options> {
    return {
      type: 'view',
      children: [{ type: 'line' }],
    };
  }

  /**
   * 获取 万能图 默认配置
   */
  protected getDefaultOptions() {
    return Base.getDefaultOptions();
  }

  /**
   * 万能图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<Options>) => void {
    return (params) => params;
  }
}
