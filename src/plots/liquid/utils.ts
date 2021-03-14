const CAT_VALUE = 'liquid';

/**
 * 获取水波图数据
 */
export function getLiquidData(percent: number) {
  return [{ percent, type: CAT_VALUE }];
}
