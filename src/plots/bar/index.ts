import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';
import { reisterShape } from './shape';

import { BarOptions } from './type';

export type { BarOptions };

reisterShape();

export class Bar extends Plot<BarOptions> {
  /** 图表类型 */
  public type = 'Bar';

  /**
   * 获取 条形图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<BarOptions> {
    return {
      type: 'view',
      coordinate: { transform: [{ type: 'transpose' }] },
      children: [{ type: 'interval' }],
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
        elementHighlightByColor: {
          background: true,
        },
      },
    };
  }

  /**
   * 获取 条形图 默认配置
   */
  protected getDefaultOptions() {
    return Bar.getDefaultOptions();
  }

  /**
   * 条形图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<BarOptions>) => void {
    return adaptor;
  }
}
