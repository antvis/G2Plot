import { createPattern } from '../plugin/pattern';
import { Params } from '../core/adaptor';
import { Options, StyleAttr } from '../types';
import { deepAssign } from '../utils';

/**
 * Pattern 通道，处理图案填充
 * @param key key of style property
 * @returns
 */
export function pattern(key: string) {
  return <O extends Options = Options>(params: Params<O>): Params<O> => {
    const { options } = params;
    const { pattern: patternOption } = options;

    // 没有 pattern 配置，则直接返回
    if (!patternOption) {
      return params;
    }

    /** ~~~~~~~ 进行贴图图案处理 ~~~~~~~ */

    const style: StyleAttr = (datum: any) => {
      let pattern: CanvasPattern;
      if (typeof patternOption === 'function') {
        // 1. 如果是 ((datum: Datum) => CanvasPattern)，直接传给 color
        pattern = patternOption.call(datum);
      } else {
        console.log('datum', datum, params.chart);

        // 2. 如果是 string，PatternStyle, 则 pattern = createPattern(PatternStyle) 转换为 CanvasPattern
        // 3. 如果是 CanvasPattern，则直接赋予
        pattern = patternOption instanceof CanvasPattern ? patternOption : createPattern(patternOption as any);
      }

      return {
        ...(typeof options[key] === 'function' ? options[key].call(datum) : options[key] || {}),
        fill: pattern,
      };
    };

    return deepAssign({}, params, { options: { [key]: style } });
  };
}
