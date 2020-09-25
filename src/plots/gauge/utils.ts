import { Data, Datum } from '../../types';
import { RANGE_VALUE, RANGE_TYPE } from './constant';

/**
 * 将 range 生成为 data 数据
 * @param range
 * @param key
 */
export function processRangeData(range: number[]): Data {
  return (
    range
      // 映射为 stack 的数据
      .map((r: number, idx: number) => {
        return { [RANGE_VALUE]: r - (range[idx - 1] || 0), [RANGE_TYPE]: `${idx}` };
      })
      // 去掉 0 的数据
      .filter((d: Datum) => !!d[RANGE_VALUE])
  );
}
