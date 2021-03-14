import { clamp } from '@antv/util';
import { isRealNumber } from '../../utils/number';

/**
 * 获取进度条数据
 */
export function getProgressData(percent: number) {
  const clampPercent = clamp(isRealNumber(percent) ? percent : 0, 0, 1);
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
