import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';
import { DualAxesOptions } from './type';

export type { DualAxesOptions };

export class DualAxes extends Plot<DualAxesOptions> {
  /** 图表类型 */
  public type = 'DualAxes';

  /**
   * 获取 双轴图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<DualAxesOptions> {
    return {
      type: 'view',
      axis: {
        y: { title: false, tick: false },
        x: { title: false },
      },
      scale: {
        y: {
          independent: true,
          nice: true,
        },
      },
    };
  }

  /**
   * 获取 条形图 默认配置
   */
  protected getDefaultOptions() {
    return DualAxes.getDefaultOptions();
  }

  /**
   * 条形图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<DualAxesOptions>) => void {
    return adaptor;
  }
}
