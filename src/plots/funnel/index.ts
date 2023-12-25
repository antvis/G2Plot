import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';
import { FunnelOptions } from './type';

export type { FunnelOptions };

export class Funnel extends Plot<FunnelOptions> {
  /** 图表类型 */
  public type = 'column';

  /**
   * 获取 漏斗图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<FunnelOptions> {
    return {
      type: 'view',
      scale: { x: { padding: 0 } },
      animate: { enter: { type: 'fadeIn' } },
      axis: false,
      shapeField: 'funnel',
      label: {
        position: 'inside',
        transform: [{ type: 'contrastReverse' }],
      },
      children: [
        {
          type: 'interval',
        },
      ],
    };
  }

  /**
   * 获取 漏斗图 默认配置
   */
  protected getDefaultOptions() {
    return Funnel.getDefaultOptions();
  }

  /**
   * 漏斗图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<FunnelOptions>) => void {
    return adaptor;
  }
}
