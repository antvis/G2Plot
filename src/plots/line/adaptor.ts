import { Adaptor } from '../../core/adaptor';
import { LineOptions } from './types';
import { Chart } from '@antv/g2';

/**
 * 折线图适配器
 */
export class LineAdaptor extends Adaptor<LineOptions> {
  public convent(chart: Chart, options: LineOptions) {
    const { data, xField, yField, seriesField, color } = options;

    // TODO 具体的折线图操作逻辑
    chart.data(data);
    const geometry = chart.line().position(`${xField}*${yField}`);

    if (seriesField) {
      geometry.color(seriesField, color);
    }
  }
}
