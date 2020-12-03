import { get, isNumber } from '@antv/util';
import { Data, Datum, Meta } from '../types';

/**
 * 查看数据是否是全负数、或者全正数
 * @param data
 * @param field
 */
export function adjustYMetaByZero(data: Data, field: string): Meta {
  // 过滤出数字数据
  const numberData = data.filter((datum: Datum) => {
    const v = get(datum, [field]);
    return isNumber(v) && !isNaN(v);
  });

  const gtZero = numberData.every((datum: Datum) => get(datum, [field]) >= 0);
  const ltZero = numberData.every((datum: Datum) => get(datum, [field]) <= 0);

  // 目前是增量更新，对 { min: 0, max: undefined } 进行 update({ max: 0 }) 会得到 { min: 0, max: 0 }
  if (gtZero) {
    return { min: 0 };
  }
  if (ltZero) {
    return { max: 0 };
  }
  return {};
}
