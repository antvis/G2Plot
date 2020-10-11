import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { DEFAULT_COLORS } from '../../constant';
import { WaterOptions } from './types';
import { adaptor } from './adaptor';

export { WaterOptions };

/**
 * 瀑布图
 */
export class Waterfall extends Plot<WaterOptions> {
  /** 图表类型 */
  public readonly type: string = 'waterfall';

  /**
   * 获取 瀑布图 的适配器
   */
  protected getSchemaAdaptor(): Adaptor<WaterOptions> {
    return adaptor;
  }

  /**
   * 获取 瀑布图 的默认配置
   */
  protected getDefaultOptions(): Partial<WaterOptions> {
    return {
      tooltip: {
        showCrosshairs: false,
        showMarkers: false,
        shared: true,
      },
      /** default: show label */
      label: {},
      /** default: show leaderLine */
      leaderLine: {
        style: {
          lineWidth: 1,
          stroke: '#8c8c8c',
          lineDash: [4, 2],
        },
      },
      /** default: show total */
      total: {
        label: '总计',
        style: {
          fill: 'rgba(0, 0, 0, 0.25)',
        },
      },
      interactions: [{ type: 'element-active' }],
      risingFill: DEFAULT_COLORS.RISING_FILL,
      fallingFill: DEFAULT_COLORS.FALLING_FILL,
      waterfallStyle: {
        fill: 'rgba(0, 0, 0, 0.25)',
      },
    };
  }
}
