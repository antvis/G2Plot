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
  console.log(gtZero);

  // 目前是增量更新，对 { min: 0, max: undefined } 进行 update({ max: 0 }) 会得到 { min: 0, max: 0 }
  // 需要添加 undefined 进行覆盖
  if (gtZero) {
    return { min: 0, max: undefined };
  }
  if (ltZero) {
    return { max: 0, min: undefined };
  }
  return {};
}
