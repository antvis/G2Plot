import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';

import type { BoxOptions } from './type';

export type { BoxOptions };

export class Box extends Plot<BoxOptions> {
  /** 图表类型 */
  public type = 'box';

  /**
   * 获取箱线图默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<BoxOptions> {
    return {
      type: 'view',
      children: [{ type: 'box' }],
      axis: {
        y: { title: false },
        x: { title: false },
      },
      // 默认 tooltip
      tooltip: {
        items: [
          { name: 'min', channel: 'y' },
          { name: 'q1', channel: 'y1' },
          { name: 'q2', channel: 'y2' },
          { name: 'q3', channel: 'y3' },
          { name: 'max', channel: 'y4' },
        ],
      },
    };
  }

  /**
   * 获取 折线图 默认配置
   */
  protected getDefaultOptions() {
    return Box.getDefaultOptions();
  }

  /**
   * 折线图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<BoxOptions>) => void {
    return adaptor;
  }
}
