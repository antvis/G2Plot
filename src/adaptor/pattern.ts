import { isString, get, isObjectLike, isFunction, isNil } from '@antv/util';
import { createPattern, PatternShape, PatternStyle } from '../plugin/pattern';
import { Params } from '../core/adaptor';
import { Options } from '../types';
import { deepAssign } from '../utils';

export function pattern(styleKey: string) {
  return function <O extends Options = Options>(params: Params<O>): Params<O> {
    const { options } = params;
    const patternAttr = get(options, 'pattern', null);
    /**
     * pattern: PatternShape | PatternStyle | ((datum: Datum) => CanvasPattern) | CanvasPattern;
     */
    let pattern, color, style;
    /**
     * 1. 如果是 string，PatternStyle 就通过 createPattern 函数转换成 pattern对象
     * PatternStyle = {type: 'dot', cfg:{size: [10, 10], bgColor: 'aliceblue'}}
     * const pattern = createPattern(PatternStyle);
     */
    if (isString(patternAttr) || isObjectLike(patternAttr)) {
      pattern = createPattern(patternAttr as PatternShape | PatternStyle);
      style = {
        fill: pattern,
      };
    }
    /**
     * 2. 如果是 ((datum: Datum) => CanvasPattern)，直接传给 color
     */
    if (isFunction(patternAttr)) {
      color = patternAttr;
    }
    /**
     * 3. 如果是 CanvasPattern，直接传给 style: { fill: pattern }
     */
    if (patternAttr instanceof CanvasPattern) {
      style = {
        fill: patternAttr,
      };
    }

    let p = params;
    if (!isNil(color)) p = deepAssign({}, p, { options: { color } });
    if (!isNil(style)) p = deepAssign({}, p, { options: { [styleKey]: style } });

    return p;
  };
}
