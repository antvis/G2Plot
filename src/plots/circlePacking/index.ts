import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';

import type { CirclePackingOptions } from './type';

export type { CirclePackingOptions };

export class CirclePacking extends Plot<CirclePackingOptions> {
  /** 图表类型 */
  public type = 'CirclePacking';

  /**
   * 获取 circle packing 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<CirclePackingOptions> {
    return {
      legend: false,
      type: 'view',
      children: [
        {
          type: 'pack',
        },
      ],
    };
  }

  /**
   * 获取 打包图 默认配置
   */
  protected getDefaultOptions() {
    return CirclePacking.getDefaultOptions();
  }

  /**
   * 打包图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<CirclePackingOptions>) => void {
    return adaptor;
  }
}
