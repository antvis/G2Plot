import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';
import { TinyRingOptions } from './type';

export type { TinyRingOptions };

export class TinyRing extends Plot<TinyRingOptions> {
  /** 图表类型 */
  public type = 'TinyRing';

  /**
   * 获取进度图默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<TinyRingOptions> {
    return {
      type: 'view',
      data: [],
      autoFit: false,
      margin: 0,
      padding: 0,
      coordinate: { type: 'theta' },
      animate: { enter: { type: 'waveIn' } },
      interaction: { tooltip: false },
      tooltip: false,
      children: [
        {
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
    return TinyRing.getDefaultOptions();
  }

  /**
   * 迷你折线图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<TinyRingOptions>) => void {
    return adaptor;
  }
}
