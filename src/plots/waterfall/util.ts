import { isNumber, reduce } from '@antv/util';
import { Data } from '@antv/g2/lib/interface';
import { invariant } from '../../utils';

/**
 * @desc 数据处理函数，统一将数据处理成[start, end]
 * @param data
 * @param xField
 * @param yField
 * @param totalLabel
 * @param showTotal 是否显示 累计
 */
export function processData(
  data: Data,
  xField: string,
  yField: string,
  totalLabel: string = '总和',
  showTotal?: boolean
) {
  let preSum = 0; // 前置项总和
  const newData = [];
  data.forEach((item) => {
    // 校验数据合法性
    invariant(isNumber(item[yField]) && !Number.isNaN(item[yField]), `${item[yField]} should be a valid number`);
    // 处理数据
    newData.push({
      ...item,
      [yField]: [preSum, preSum + item[yField]],
    });
    preSum = preSum + item[yField];
  });
  // 如果需要展示总和
  if (showTotal) {
    newData.push({
      [xField]: totalLabel,
      [yField]: [0, preSum],
    });
  }
  return newData;
}
