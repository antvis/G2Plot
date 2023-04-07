import { Plot } from '../../core/plot';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';
import { BarOptions } from './type';

export type { BarOptions };

export class Bar extends Plot<BarOptions> {
  /** 图表类型 */
  public type = 'bar';

  /**
   * 获取 条形图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<BarOptions> {
    return { type: 'interval' };
  }

  /**
   * 获取 条形图 默认配置
   */
  protected getDefaultOptions() {
    return Bar.getDefaultOptions();
  }

  /**
   * 条形图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<BarOptions>) => void {
    return adaptor;
  }
}
