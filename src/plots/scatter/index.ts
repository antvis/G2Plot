import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';

import type { ScatterOptions } from './type';

export type { ScatterOptions };

export class Scatter extends Plot<ScatterOptions> {
  /** 图表类型 */
  public type = 'scatter';

  /**
   * 获取 散点图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<ScatterOptions> {
    return {
      axis: {
        y: { title: false },
        x: { title: false },
      },
      legend: {
        size: false,
      },
      children: [{ type: 'point' }],
    };
  }

  /**
   * 获取 散点图 默认配置
   */
  protected getDefaultOptions() {
    return Scatter.getDefaultOptions();
  }

  /**
   * 散点图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<ScatterOptions>) => void {
    return adaptor;
  }
}
