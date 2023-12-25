import { Plot } from '../../base';
import type { Adaptor } from '../../types';
import { adaptor } from './adaptor';
import { LineOptions } from './type';

export type { LineOptions };

export class Line extends Plot<LineOptions> {
  /** 图表类型 */
  public type = 'line';

  /**
   * 获取 折线图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<LineOptions> {
    return {
      type: 'view',
      scale: {
        y: { nice: true },
      },
      interaction: {
        tooltip: {
          shared: true,
        },
      },
      axis: {
        y: { title: false },
        x: { title: false },
      },
      // 使用该动画，会导致线形图-连接空值 一进入页面渲染不出来，必须要更改窗口尺寸触发重新渲染。建议动画暂时使用默认
      // animate: {
      //   enter: { type: 'growInX' },
      // },
      children: [{ type: 'line' }],
    };
  }

  /**
   * 获取 折线图 默认配置
   */
  protected getDefaultOptions() {
    return Line.getDefaultOptions();
  }

  /**
   * 折线图适配器
   */
  protected getSchemaAdaptor(): (params: Adaptor<LineOptions>) => void {
    return adaptor;
  }
}
