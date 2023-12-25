import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';
import { TinyLineOptions } from './type';

export type { TinyLineOptions };

export class TinyLine extends Plot<TinyLineOptions> {
  /** 图表类型 */
  public type = 'TinyLine';

  /**
   * 获取 迷你折线图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<TinyLineOptions> {
    return {
      type: 'view',
      children: [{ type: 'line', axis: false }],
      autoFit: false,
      animate: {
        enter: { type: 'growInX', duration: 500 },
      },
      padding: 0,
      margin: 0,
      tooltip: false,
    };
  }

  /**
   * 获取 迷你折线图 默认配置
   */
  protected getDefaultOptions() {
    return TinyLine.getDefaultOptions();
  }

  /**
   * 迷你折线图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<TinyLineOptions>) => void {
    return adaptor;
  }
}
