import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';
import { ViolinOptions } from './type';

export type { ViolinOptions };

export class Violin extends Plot<ViolinOptions> {
  /** 图表类型 */
  public type = 'violin';

  /**
   * 获取 折线图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<ViolinOptions> {
    return {
      type: 'view',
      children: [
        {
          type: 'density',
          sizeField: 'size',
          tooltip: false,
        },
        {
          type: 'boxplot',
          shapeField: 'violin',
          style: {
            opacity: 0.5,
            point: false,
          },
        },
      ],
      animate: { enter: { type: 'fadeIn' } },
    };
  }

  /**
   * 获取 折线图 默认配置
   */
  protected getDefaultOptions() {
    return Violin.getDefaultOptions();
  }

  /**
   * 折线图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<ViolinOptions>) => void {
    return adaptor;
  }
}
