import { BarOptions } from '.';

/**
 * 条形图数据需要进行反转
 * @param data
 */
export function transformBarData(data: BarOptions['data']): BarOptions['data'] {
  return data ? data.slice().reverse() : data;
}
