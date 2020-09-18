import { Data } from '@antv/g2/lib/interface';
import { each, isString } from '@antv/util';
import { LEVEL, log } from '../../utils';

/**
 * 获取总计值
 * @param data
 * @param field
 */
export function getTotalValue(data: Data, field: string) {
  let total = null;
  each(data, (item) => {
    if (typeof item[field] === 'number') {
      total += item[field];
    }
  });
  return total;
}

/**
 * 将 字符串的百分比 转换为 数值百分比
 */
export function parsePercentageToNumber(percentage: string): number {
  log(LEVEL.WARN, !isString(percentage), 'invalid string');

  if (!isString(percentage)) {
    return percentage as any;
  }

  if (percentage.endsWith('%')) {
    return Number(percentage.slice(0, -1)) * 0.01;
  }
  return Number(percentage);
}
