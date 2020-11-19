import { isNumber } from '@antv/util';
/**
 * 转化率的计算方式
 * @param prev
 * @param next
 */
export function conversionTagformatter(prev: number, next: number): string {
  if (!isNumber(prev) || !isNumber(next)) {
    return '-';
  }

  if (prev === next) {
    return `${(0).toFixed(2)}%`;
  }
  if (prev === 0) {
    return '∞';
  }
  if (next === 0) {
    return '-∞';
  }

  return `${((100 * next) / prev).toFixed(2)}%`;
}
