import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';
import { AreaOptions } from './type';

export type { AreaOptions };

export class Area extends Plot<AreaOptions> {
  /** 图表类型 */
  public type = 'area';

  /**
   * 获取 面积图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<AreaOptions> {
    return {
      type: 'view',
      children: [{ type: 'area' }],
      scale: {
        y: { nice: true },
      },
      axis: {
        y: { title: false },
        x: { title: false },
      },
      interaction: {
        tooltip: {
          shared: true,
        },
      },
    };
  }

  /**
   * 获取 面积图 默认配置
   */
  protected getDefaultOptions() {
    return Area.getDefaultOptions();
  }

  /**
   * 面积图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<AreaOptions>) => void {
    return adaptor;
  }
}
