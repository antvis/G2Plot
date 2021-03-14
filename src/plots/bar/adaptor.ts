import { Params } from '../../core/adaptor';
import { adaptor as columnAdaptor } from '../column/adaptor';
import { BarOptions } from './types';
import { transformBarData } from './utils';

export { meta } from '../column/adaptor';

/**
 * 柱形图适配器
 * @param params
 */
export function adaptor(params: Params<BarOptions>) {
  const { chart, options } = params;
  const {
    xField,
    yField,
    xAxis,
    yAxis,
    barStyle,
    barWidthRatio,
    label,
    data,
    seriesField,
    isStack,
    minBarWidth,
    maxBarWidth,
  } = options;

  // label of bar charts default position is left, if plot has label
  if (label && !label.position) {
    label.position = 'left';
    // 配置默认的 label layout： 如果用户没有指定 layout 和 position， 则自动配置 layout
    if (!label.layout) {
      label.layout = [
        { type: 'interval-adjust-position' },
        { type: 'interval-hide-overlap' },
        { type: 'adjust-color' },
        { type: 'limit-in-plot', cfg: { action: 'hide' } },
      ];
    }
  }

  // 默认 legend 位置
  let { legend } = options;
  if (seriesField) {
    if (legend !== false) {
      legend = {
        position: isStack ? 'top-left' : 'right-top',
        reversed: isStack ? false : true,
        ...(legend || {}),
      };
    }
  } else {
    legend = false;
  }
  // @ts-ignore 直接改值
  params.options.legend = legend;

  // 默认 tooltip 配置
  let { tooltip } = options;
  if (seriesField) {
    if (tooltip !== false) {
      tooltip = {
        reversed: isStack ? false : true,
        ...(tooltip || {}),
      };
    }
  }
  // @ts-ignore 直接改值
  params.options.tooltip = tooltip;

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
        minColumnWidth: minBarWidth,
        maxColumnWidth: maxBarWidth,
        columnBackground: options.barBackground,
        // bar 调整数据顺序
        data: transformBarData(data),
      },
    },
    true
  );
}
