import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { HeatmapOptions } from './types';
import { adaptor } from './adaptor';

export { HeatmapOptions };

export class Heatmap extends Plot<HeatmapOptions> {
  /** 图表类型 */
  public type: string = 'heatmap';

  /**
   * 获取直方图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<HeatmapOptions> {
    return adaptor;
  }
}
