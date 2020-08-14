import { Scale } from '@antv/g2/lib/dependents';
import { Data, Datum } from '@antv/g2/lib/interface';
import { each, isString } from '@antv/util';
import { StatisticData } from './types';

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
 * 获取指标卡统计值
 * @param data
 * @param angleScale
 * @param colorScale
 */
export function getStatisticData(data: Datum, angleScale?: Scale, colorScale?: Scale): StatisticData {
  const angleField = angleScale ? angleScale.field : null;
  const colorField = colorScale ? colorScale.field : null;

  return {
    title: colorScale ? colorScale.getText(data[colorField]) : null,
    value: angleScale ? angleScale.getText(data[angleField]) : data[angleField],
  };
}

/**
 * 将 字符串的百分比 转换为 数值百分比
 */
export function parsePercentageToNumber(percentage: string): number {
  if (!isString(percentage)) {
    return percentage;
  }
  if (percentage.endsWith('%')) {
    return Number(percentage.slice(0, -1)) * 0.01;
  }
  return Number(percentage);
}
