import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { HeatmapOptions } from './types';
import { adaptor } from './adaptor';
import { DEFAULT_OPTIONS } from './constant';
// registered shapes
import './shapes/circle';
import './shapes/square';

export type { HeatmapOptions };

export class Heatmap extends Plot<HeatmapOptions> {
  /**
   * 获取 柱形图 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<HeatmapOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 图表类型 */
  public type: string = 'heatmap';

  /**
   * 获取直方图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<HeatmapOptions> {
    return adaptor;
  }

  /**
   * 获取 色块图 默认配置
   */
  protected getDefaultOptions() {
    return Heatmap.getDefaultOptions();
  }
}
