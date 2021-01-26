import { each, every, filter, isString } from '@antv/util';
import { LEVEL, log } from '../../utils';
import { Data } from '../../types';
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
 * 处理不合法的数据(过滤 非数值型 和 NaN，保留 null)
 * @param data
 * @param angleField
 */
export function processIllegalData(data: PieOptions['data'], angleField: string) {
  const processData = filter(data, (d) => {
    const v = d[angleField];
    return (typeof v === 'number' && !isNaN(v)) || v === null;
  });

  // 打印异常数据情况
  log(LEVEL.WARN, processData.length === data.length, 'illegal data existed in chart data.');

  return processData;
}

/**
 * 判断数据是否全部为 0
 * @param data
 * @param angleField
 */
export function isAllZero(data: PieOptions['data'], angleField: string): boolean {
  return every(data, (d) => d[angleField] === 0);
}
