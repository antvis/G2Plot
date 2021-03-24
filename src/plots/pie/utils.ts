import { each, every, isString } from '@antv/util';
import { Data } from '../../types';
import { processIllegalData } from '../../utils';
import { PieOptions } from './types';

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
 * pie label offset adaptor
 */
export function adaptOffset(type: string, offset?: string | number): string | number {
  let defaultOffset;
  switch (type) {
    case 'inner':
      defaultOffset = '-30%';
      if (isString(offset) && offset.endsWith('%')) {
        return parseFloat(offset) * 0.01 > 0 ? defaultOffset : offset;
      }
      return offset < 0 ? offset : defaultOffset;
    case 'outer':
      defaultOffset = 12;
      if (isString(offset) && offset.endsWith('%')) {
        return parseFloat(offset) * 0.01 < 0 ? defaultOffset : offset;
      }
      return offset > 0 ? offset : defaultOffset;
    default:
      return offset;
  }
}

/**
 * 判断数据是否全部为 0
 * @param data
 * @param angleField
 */
export function isAllZero(data: PieOptions['data'], angleField: string): boolean {
  return every(processIllegalData(data, angleField), (d) => d[angleField] === 0);
}
