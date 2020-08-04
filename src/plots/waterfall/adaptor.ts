import { Params } from '../../core/adaptor';
import { WaterfallOptions } from './types';
import { flow, pick, log, LEVEL } from '../../utils';

/** 数据处理 */
function dataHandler(params: Params<WaterfallOptions>) {
  const { chart, options } = params;
  const { data = [], xField, yField, showTotal } = options;
  let preSum = 0;
  const processData = data.map((item, index) => {
    /**
     * @todo 对每个数据判断，如果不是数字抛出异常
     */
    if (index > 0) {
      const newYFieldValue = [preSum, preSum + item[yField]];
      preSum = preSum + item[yField];
      return { ...item, [yField]: newYFieldValue };
    }
    preSum = preSum + item[yField];
    return item;
  });
  if (showTotal && showTotal.visible) {
    processData.push({
      [xField]: showTotal.label,
      [yField]: preSum,
    });
  }
  chart.data(processData);
  return params;
}

/** 字段处理 */
function field(params: Params<WaterfallOptions>) {
  const { chart, options } = params;
  const { xField, yField, color } = options;

  const geometry = chart.interval().position(`${xField}*${yField}`);
  geometry.color(xField, color as string);
  geometry.shape('waterfall');
  return params;
}

/** 连接线样式处理 */
function LeaderLineStyle(params: Params<WaterfallOptions>) {
  /**
   * @todo 链接线样式
   */
  return params;
}

export function adaptor(param: Params<WaterfallOptions>) {
  return flow(dataHandler, field, LeaderLineStyle)(param);
}
