import { isNumber } from '@antv/util';
/**
 * 转化率的计算方式
 * @param prev
 * @param next
 */
export function conversionTagFormatter(prev: number, next: number): string {
  if (!isNumber(prev) || !isNumber(next)) {
    return '-';
  }

  // 0 / 0 没有意义
  if (prev === 0 && next === 0) {
    return '-';
  }

  if (prev === next) {
    return '100%';
  }

  if (prev === 0) {
    return '∞';
  }

  return `${((100 * next) / prev).toFixed(2)}%`;
}
