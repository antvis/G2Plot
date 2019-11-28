import { flatten, groupBy, map } from '@antv/util';

/**
 * 按照scale字段values中的start和end信息从全部数据中取出对应的部分
 *
 * @param field scale field
 * @param values scale values
 * @param data original data
 * @param range range start & end
 */
export const getDataByScaleRange = (
  field: string,
  values: string[],
  data: object[],
  [start, end]: [number, number],
  vertical: boolean = false
): object[] => {
  const groupedData = groupBy(data, field);
  const newValues = vertical
    ? values
        .slice()
        .reverse()
        .slice(start, end)
        .reverse()
    : values.slice(start, end);

  return flatten(map(newValues, (value: string) => groupedData[value] || []));
};
