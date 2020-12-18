/**
 * 是否真实的是数字
 * @param v
 */
export function isRealNumber(v: any) {
  return typeof v === 'number' && !isNaN(v);
}
