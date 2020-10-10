import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
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
      label: {},
      interactions: [{ type: 'element-active' }],
      waterfallStyle: {},
    };
  }
}
