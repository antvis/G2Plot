import { clamp } from '@antv/util';
import { isRealNumber } from '../../utils/number';

/**
 * 获取进度条数据
 */
export function getProgressData(percent: number) {
  const clampPercent = clamp(isRealNumber(percent) ? percent : 0, 0, 1);
  return [
    {
      // 用于 progressStyle 的回调方法
      current: `${clampPercent}`,
      type: 'current',
      percent: clampPercent,
    },
    {
      current: `${clampPercent}`,
      type: 'target',
      percent: 1,
    },
  ];
}
