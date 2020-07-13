import { Adaptor } from '../../core/adaptor';
import { ScatterOptions } from './types';
import { Chart } from '@antv/g2';

/**
 * 散点图适配器
 */
export class ScatterAdaptor extends Adaptor<ScatterOptions> {
  public convent(chart: Chart, options: ScatterOptions) {
    const { data, xField, yField, seriesField, color } = options;

    // TODO 具体的散点图操作逻辑
    chart.data(data);
    const geometry = chart.point().position(`${xField}*${yField}`);

    if (seriesField) {
      geometry.color(seriesField, color);
    }
  }
}
