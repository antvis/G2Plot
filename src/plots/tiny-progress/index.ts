import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';
import { TinyProgressOptions } from './type';

export type { TinyProgressOptions };

export class TinyProgress extends Plot<TinyProgressOptions> {
  /** 图表类型 */
  public type = 'TinyProgress';

  /**
   * 获取 进度图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<TinyProgressOptions> {
    return {
      type: 'view',
      data: [],
      autoFit: false,
      margin: 0,
      padding: 0,
      tooltip: false,
      children: [
        {
          interaction: { tooltip: false },
          coordinate: { transform: [{ type: 'transpose' }] },
          type: 'interval',
          axis: false,
          legend: false,
          encode: { y: (d) => d, color: (d, idx) => idx },
        },
      ],
    };
  }

  /**
   * 获取 进度图 默认配置
   */
  protected getDefaultOptions() {
    return TinyProgress.getDefaultOptions();
  }

  /**
   * 迷你折线图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<TinyProgressOptions>) => void {
    return adaptor;
  }
}
