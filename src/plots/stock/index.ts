import { deepMix } from '@antv/util';
import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { CandleOptions } from './types';
import { adaptor } from './adaptor';

import { DEFAULT_TOOLTIP_OPTIONS } from './constant';
export { CandleOptions };

export class Candle extends Plot<CandleOptions> {
  /** 图表类型 */
  public type: string = 'Candle';

  /**
   * 默认配置
   *  g2/g2plot默 认 配 置 -->  图 表 默 认 配 置  --> 开 发 者 自 定 义 配 置  --> 最 终 绘 图 配 置
   *  TODO: Geometry(tooltip...)
   *
   */
  protected getDefaultOptions(): Partial<CandleOptions> {
    return deepMix({}, super.getDefaultOptions(), {
      // 设置默认图表 tooltips
      tooltip: DEFAULT_TOOLTIP_OPTIONS,
      interactions: [{ type: 'tooltip' }],
    });
  }

  /**
   * 获取 蜡烛图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<CandleOptions> {
    return adaptor;
  }
}
