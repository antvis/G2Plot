import { Adaptor } from '../../core/adaptor';
import { Plot } from '../../core/plot';
import { binHistogram } from '../../utils/transform/histogram';
import { adaptor } from './adaptor';
import { DEFAULT_OPTIONS } from './constant';
import { HistogramOptions } from './types';

export type { HistogramOptions };

export class Histogram extends Plot<HistogramOptions> {
  /**
   * 获取 默认配置项
   * 供外部使用
   */
  static getDefaultOptions(): Partial<HistogramOptions> {
    return DEFAULT_OPTIONS;
  }

  /** 图表类型 */
  public type: string = 'histogram';

  public changeData(data: HistogramOptions['data']) {
    this.updateOption({ data });

    const { binField, binNumber, binWidth, stackField } = this.options;
    this.chart.changeData(binHistogram(data, binField, binWidth, binNumber, stackField));
  }

  /**
   * 获取直方图的适配器
   */
  protected getDefaultOptions() {
    return Histogram.getDefaultOptions();
  }

  /**
   * 获取直方图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<HistogramOptions> {
    return adaptor;
  }
}
