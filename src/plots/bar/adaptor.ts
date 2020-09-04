import { Params } from '../../core/adaptor';
import { adaptor as columnAdaptor } from '../column/adaptor';
import { BarOptions } from './types';

/**
 * 柱形图适配器
 * @param params
 */
export function adaptor(params: Params<BarOptions>) {
  const { chart, options } = params;
  const { xField, yField, xAxis, yAxis, barStyle, barWidthRatio, label } = options;

  // label of bar charts default position is left, if plot has label
  if (label && !label.position) {
    label.position = 'left';
  }

  // transpose column to bar
  chart.coordinate().transpose();

  return columnAdaptor({
    chart,
    options: {
      ...options,
      label,
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
