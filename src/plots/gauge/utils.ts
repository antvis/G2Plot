import { Data, Datum } from '../../types';

/**
 * 将 range 生成为 data 数据
 * @param range
 * @param key
 */
export function processRangeData(range: number[], key: string = 'range'): Data {
  return (
    range
      // 映射为 stack 的数据
      .map((r: number, idx: number) => {
        return { [key]: r - (range[idx - 1] || 0) };
      })
      // 去掉 0 的数据
      .filter((d: Datum) => !!d[key])
  );
}
