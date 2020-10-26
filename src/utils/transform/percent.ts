import { groupBy, map, reduce, each } from '@antv/util';
import { Data } from '../../types';

function sumBy(data: any, func: (d: any) => number): number {
  return reduce(
    data,
    (r: number, d: any) => {
      return (r += func(d));
    },
    0
  );
}

/**
 * 对数据进行百分比化
 * @param data
 * @param measure
 * @param groupField
 * @param as
 */
export function percent(data: Data, measure: string, groupField: string, as: string) {
  // 1. 首先根据 dimension 分组
  const groupedData = groupBy(data, groupField);

  const result = [];
  each(groupedData, (v: Data) => {
    const total = sumBy(v, (o) => o[measure]);

    const percentage = map(v, (o) => ({
      ...o,
      [as]: o[measure] / total,
    }));

    result.push(...percentage);
  });

  return result;
}
