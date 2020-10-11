import { isUndefined, isNumber, get, reduce } from '@antv/util';
import { Options } from '../../types';
import { LEVEL, log } from '../../utils';

/**
 * @desc 数据处理函数，统一将数据处理成[start, end]
 * @param data
 * @param xField
 * @param yField
 * @param totalLabel
 */
export function processData(
  data: Options['data'],
  xField: string,
  yField: string,
  newYField: string,
  total?: false | { label?: string }
) {
  const newData = [];
  reduce(
    data,
    (r, d) => {
      // 校验数据合法性
      log(LEVEL.WARN, isNumber(d[yField]), `${d[yField]} is not a valid number`);
      const value = isUndefined(d[yField]) ? null : d[yField];
      newData.push({ ...d, [newYField]: [r, r + value] });

      return r + value;
    },
    0
  );
  // 如果需要展示总和
  if (newData.length && total) {
    const sum = get(newData, [[data.length - 1], newYField, [1]]);
    newData.push({
      [xField]: total.label,
      [yField]: sum,
      [newYField]: [0, sum],
    });
  }
  return newData;
}
