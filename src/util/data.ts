import { groupBy, mapValues, map, flatten, isNumber, reduce, each } from '@antv/util';
import { DataItem } from '../interface/config';

export const transformDataPercentage = (data: DataItem[], groupField: string, measures: string[]): DataItem[] => {
  // 按照groupBy字段计算各个group的总和
  let chain = groupBy(data, groupField);
  chain = mapValues(chain, (items) => map(items, (item) => map(measures, (field) => item[field])));
  chain = mapValues(chain, flatten);
  chain = mapValues(chain, (vals) =>
    map(vals, (val) => {
      // @ts-ignore
      const v = Number.parseFloat(val);
      if (!isNumber(v) || isNaN(v)) {
        return 0;
      }
      return v;
    })
  );
  // @ts-ignore
  const groupTotals = mapValues(chain, (vals: number[]) => reduce(vals, (sum, val) => sum + val, 0));

  // 覆盖measures字段的值为对于的百分比
  const newData = map(data, (item) => {
    // @ts-ignore
    const rst = { ...item, _origin: item, total: groupTotals[item[groupField]] };
    each(measures, (field) => {
      // @ts-ignore
      rst[field] = item[field] / (groupTotals[item[groupField]] || 1);
    });

    return rst;
  });

  // 检查精度，确保总和为1
  each(groupBy(newData, groupField), (items: DataItem[]) => {
    let sum = 0;
    each(items, (item: DataItem, itemIdx: number) => {
      each(measures, (field: string, fieldIdx: number) => {
        // @ts-ignore
        if (sum + item[field] >= 1 || (itemIdx === items.length - 1 && fieldIdx === measures.length - 1 && sum > 0)) {
          item[field] = 1 - sum;
        }
        // @ts-ignore
        sum += item[field];
      });
    });
  });
  // @ts-ignore
  return newData;
};
