import { isFunction } from 'lodash';
import { Params } from '../../core/adaptor';
import { flow, pick, log, LEVEL } from '../../utils';
import { processData } from './utils';
import { WaterfallOptions } from './types';

/** 数据处理 */
function dataHandler(params: Params<WaterfallOptions>) {
  const { chart, options } = params;
  const { data = [], xField, yField, showTotal, totalLabel } = options;
  const newData = processData(data, xField, yField, showTotal, totalLabel);
  chart.data(newData);
  return params;
}

/** 字段处理 */
function field(params: Params<WaterfallOptions>) {
  const { chart, options } = params;
  const { xField, yField, color } = options;

  const geometry = chart.interval().position(`${xField}*${yField}`);
  // geometry.color(xField, (type) => isFunction(color) ? color(type) : color);
  geometry.color(xField, (type) => {console.log(type);return isFunction(color) ? color(type) : color});
  geometry.shape('waterfall');
  return params;
}

/** 连接线样式处理 */
function leaderLineStyle(params: Params<WaterfallOptions>) {
  /**
   * @todo 链接线样式
   */
  return params;
}

export function adaptor(param: Params<WaterfallOptions>) {
  return flow(dataHandler, field, leaderLineStyle)(param);
}
