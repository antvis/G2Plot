import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';

import type { RoseOptions } from './type';

export type { RoseOptions };

export class Rose extends Plot<RoseOptions> {
  /** 图表类型 */
  public type = 'rose';

  /**
   * 获取 散点图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<RoseOptions> {
    return {
      type: 'view',
      children: [{ type: 'interval' }],
      coordinate: { type: 'polar' },
      animate: { enter: { type: 'waveIn' } },
    };
  }

  /**
   * 获取 散点图 默认配置
   */
  protected getDefaultOptions() {
    return Rose.getDefaultOptions();
  }

  /**
   * 散点图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<RoseOptions>) => void {
    return adaptor;
  }
}
