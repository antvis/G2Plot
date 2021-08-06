import { getPattern } from '../plugin/pattern';
import { Params } from '../core/adaptor';
import { Options } from '../types';
import { deepAssign } from '../utils';

export function pattern<O extends Options = Options>(params: Params<O>): Params<O> {
  const { options } = params;
  //   const { pattern } = options;
  // pattern: string | PatternStyle | ((datum: Datum) => CanvasPattern) | CanvasPattern;

  /**
   * 1. 如果是 string，PatternStyle 就通过getPattern函数转换成 pattern对象
   * PatternStyle = {type: 'dot', cfg:{size: [10, 10], bgColor: 'aliceblue'}}
   * const pattern = getPattern(PatternStyle);

   * 2. 如果是 ((datum: Datum) => CanvasPattern)，直接传给 color
   * 
   * 3. 如果是 CanvasPattern，直接传给 style: {fill: pattern}
  */

  return deepAssign({}, params, {
    options: {
      // color: ()=>pattern or patternFunction,
      // style: {
      //   fill: pattern
      // }
    },
  });
}
