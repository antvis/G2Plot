import { clamp } from '@antv/util';

/**
 * 获取进度条数据
 */
export function getProgressData(percent: number) {
  const clampPercent = clamp(percent, 0, 1);
  return [
    {
      type: 'current',
      percent: clampPercent,
    },
    {
      type: 'target',
      percent: 1 - clampPercent,
    },
  ];
}
