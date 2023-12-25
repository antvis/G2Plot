import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';
import { HistogramOptions } from './type';

export type { HistogramOptions };

export class Histogram extends Plot<HistogramOptions> {
  /** 图表类型 */
  public type = 'Histogram';

  /**
   * 获取 直方图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<HistogramOptions> {
    return {
      type: 'view',
      autoFit: true,
      axis: {
        y: { title: false },
        x: { title: false },
      },
      children: [
        {
          type: 'rect',
          transform: [{ type: 'binX', y: 'count' }],
          interaction: {
            elementHighlightByColor: {
              background: true,
            },
          },
        },
      ],
    };
  }

  /**
   * 获取 直方图 默认配置
   */
  protected getDefaultOptions() {
    return Histogram.getDefaultOptions();
  }

  /**
   * 直方图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<HistogramOptions>) => void {
    return adaptor;
  }
}
