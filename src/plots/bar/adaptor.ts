import {} from '@antv/util';
import { Params } from '../../core/adaptor';
import { adaptor as columnAdaptor } from '../column/adaptor';
import { BarOptions } from './types';

/**
 * 柱形图适配器
 * @param params
 */
export function adaptor(params: Params<BarOptions>) {
  const { chart, options } = params;
  const { xField, yField, xAxis, yAxis, barStyle, barWidthRatio, label, data, seriesField, isStack } = options;

  // label of bar charts default position is left, if plot has label
  if (label && !label.position) {
    label.position = 'left';
  }

  // 默认 legend 位置
  let { legend } = options;
  if (seriesField) {
    if (legend !== false) {
      legend = {
        position: isStack ? 'top-left' : 'right-top',
        ...legend,
      };
    }
  } else {
    legend = false;
  }
  // @ts-ignore 直接改值
  params.options.legend = legend;

  // transpose column to bar
  chart.coordinate().transpose();

  return columnAdaptor(
    {
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
        // bar 调整数据顺序
        data: data ? data.slice().reverse() : data,
      },
    },
    true
  );
}
