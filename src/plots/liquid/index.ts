import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';

import type { LiquidOptions } from './type';

export type { LiquidOptions };

export class Liquid extends Plot<LiquidOptions> {
  /** 图表类型 */
  public type = 'Liquid';

  /**
   * 获取 水波图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<LiquidOptions> {
    return { type: 'view', children: [{ type: 'liquid' }] };
  }

  /**
   * 获取 水波图 默认配置
   */
  protected getDefaultOptions() {
    return Liquid.getDefaultOptions();
  }

  /**
   * 水波图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<LiquidOptions>) => void {
    return adaptor;
  }
}
