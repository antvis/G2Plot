import { Plot } from '../../core/plot';
import { Adaptor } from '../../core/adaptor';
import { HistogramOptions } from './types';
import { adaptor } from './adaptor';

export { HistogramOptions };

export class Histogram extends Plot<HistogramOptions> {
  /** 图表类型 */
  public type: string = 'histogram';

  /**
   * 获取直方图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<HistogramOptions> {
    return adaptor;
  }
}
