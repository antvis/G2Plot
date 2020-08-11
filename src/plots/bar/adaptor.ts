import { Params } from '../../core/adaptor';
import { BarOptions } from './types';
import { adaptor as columnAdaptor } from '../column/adaptor';

/**
 * 柱形图适配器
 * @param params
 */
export function adaptor(params: Params<BarOptions>) {
  const { chart, options } = params;
  const { xField, yField, xAxis, yAxis, barStyle, barWidthRatio } = options;

  // transpose column to bar
  chart.coordinate().transpose();

  return columnAdaptor({
    chart,
    options: {
      ...options,
      // switch xField and yField
      xField: yField,
      yField: xField,
      xAxis: yAxis,
      yAxis: xAxis,
      // rename attrs as column
      columnStyle: barStyle,
      columnWidthRatio: barWidthRatio,
    },
  });
}
