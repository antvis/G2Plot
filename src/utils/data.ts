import { get } from '@antv/util';
import { Data, Datum, Meta } from '../types';

/**
 * 查看数据是否是全负数、或者全正数
 * @param data
 * @param field
 */
export function adjustYMetaByZero(data: Data, field: string): Meta {
  const gtZero = data.every((datum: Datum) => get(datum, [field]) > 0);
  const ltZero = data.every((datum: Datum) => get(datum, [field]) < 0);

  if (gtZero) {
    return { min: 0, max: undefined };
  }
  if (ltZero) {
    return { max: 0, min: undefined };
  }
  return {};
}
