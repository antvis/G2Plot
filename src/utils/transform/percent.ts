import { map, reduce } from '@antv/util';
import { Data, Datum } from '../../types';
import { isRealNumber } from '../number';

/**
 * 对数据进行百分比化
 * @param data
 * @param measure
 * @param groupField
 * @param as
 */
export function percent(data: Data, measure: string, groupField: string, as: string) {
  // 1. 先计算每一个分组的 max 值
  const sumMap = reduce(
    data,
    (map, datum: Datum) => {
      const groupValue = datum[groupField];
      let sum = map.has(groupValue) ? map.get(groupValue) : 0;

      const v = datum[measure];

      sum = isRealNumber(v) ? sum + v : sum;
      map.set(groupValue, sum);

      return map;
    },
    new Map<string, number>()
  );

  // 2. 循环数组，计算占比
  return map(data, (datum: Datum) => {
    const v = datum[measure];
    const groupValue = datum[groupField];
    const percentage = isRealNumber(v) ? v / sumMap.get(groupValue) : 0;

    return {
      ...datum,
      [as]: percentage,
    };
  });
}

/**
 * 获取数据，如果是百分比，进行数据转换 (适用于面积图、柱状图、条形图)
 * @param isPercent 是否百分比
 */
export function getDataWhetherPecentage(
  data: Record<string, any>[],
  yField: string,
  groupField: string,
  asField: string,
  isPercent?: boolean
) {
  return !isPercent ? data : percent(data, yField, groupField, asField);
}
