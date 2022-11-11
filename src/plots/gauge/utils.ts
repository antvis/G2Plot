import { clamp, get, size, uniq } from '@antv/util';
import { Data } from '../../types';
import { PERCENT, RANGE_TYPE, RANGE_VALUE } from './constants';
import { GaugeOptions, GaugeRangeData } from './types';

/**
 * 将 range 生成为 data 数据
 * @param range
 * @param key
 * @returns {GaugeRangeData}
 */
export function processRangeData(range: number[], percent: GaugeOptions['percent']): GaugeRangeData {
  return (
    range
      // 映射为 stack 的数据
      .map((r: number, idx: number) => {
        return { [RANGE_VALUE]: r - (range[idx - 1] || 0), [RANGE_TYPE]: `${idx}`, [PERCENT]: percent };
      })
  );
}

/**
 * 获取 仪表盘 指针数据
 * @param percent
 */
export function getIndicatorData(percent: GaugeOptions['percent']): Data {
  return [{ [PERCENT]: clamp(percent, 0, 1) }];
}

/**
 * 获取仪表盘 表盘弧形数据
 * @param percent
 * @param range
 */
export function getRangeData(percent: GaugeOptions['percent'], range?: GaugeOptions['range']): GaugeRangeData {
  const ticks = get(range, ['ticks'], []);

  const clampTicks = size(ticks) ? uniq(ticks) : [0, clamp(percent, 0, 1), 1];
  if (!clampTicks[0]) {
    clampTicks.shift();
  }
  return processRangeData(clampTicks as number[], percent);
}
