import { Plot } from '../../core/plot';
import { deepAssign } from '../../utils';
import { Adaptor } from '../../core/adaptor';
import { binHistogram } from '../../utils/transform/histogram';
import { HistogramOptions } from './types';
import { adaptor } from './adaptor';

export { HistogramOptions };

export class Histogram extends Plot<HistogramOptions> {
  /** 图表类型 */
  public type: string = 'histogram';

  public changeData(data: HistogramOptions['data']) {
    this.updateOption({ data });

    const { binField, binNumber, binWidth, stackField } = this.options;
    this.chart.changeData(binHistogram(data, binField, binWidth, binNumber, stackField));
  }

  protected getDefaultOptions() {
    return deepAssign({}, super.getDefaultOptions(), {
      // @ts-ignore
      columnStyle: {
        stroke: '#FFFFFF',
      },
      tooltip: {
        shared: true,
        showMarkers: false,
      },
      interactions: [{ type: 'active-region' }],
    });
  }

  /**
   * 获取直方图的适配器
   */
  protected getSchemaAdaptor(): Adaptor<HistogramOptions> {
    return adaptor;
  }
}
