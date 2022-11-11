import { Util } from '@antv/g2';
import { get } from '@antv/util';
import { Params } from '../core/adaptor';
import { Datum, Options, StyleAttr } from '../types';
import { deepAssign } from '../utils';
import { getCanvasPattern } from '../utils/pattern';

/**
 * 使用 Pattern 通道的 options，要求有 colorField/seriesField/stackField 作为分类字段（进行颜色映射）
 */
type OptionsRequiredInPattern = Omit<Options, 'data'>;

/**
 * Pattern 通道，处理图案填充
 * 🚀 目前支持图表类型：饼图、柱状图、条形图、玉珏图等（不支持在多 view 图表中，后续按需扩展）
 *
 * @param key key of style property
 * @returns
 */
export function pattern(key: string) {
  return <O extends OptionsRequiredInPattern = OptionsRequiredInPattern>(params: Params<O>): Params<O> => {
    const { options, chart } = params;
    const { pattern: patternOption } = options;

    // 没有 pattern 配置，则直接返回
    if (!patternOption) {
      return params;
    }

    /** ~~~~~~~ 进行贴图图案处理 ~~~~~~~ */

    const style: StyleAttr = (datum?: Datum, ...args: any[]) => {
      const { defaultColor } = chart.getTheme();
      let color = defaultColor;

      const colorAttribute = chart.geometries?.[0]?.getAttribute('color');
      if (colorAttribute) {
        const colorField = colorAttribute.getFields()[0];
        const seriesValue = get(datum, colorField);
        color = Util.getMappingValue(colorAttribute, seriesValue, colorAttribute.values?.[0] || defaultColor);
      }

      let pattern: CanvasPattern = patternOption as CanvasPattern;

      // 1. 如果 patternOption 是一个回调，则获取回调结果。`(datum: Datum, color: string) => CanvasPattern`
      if (typeof patternOption === 'function') {
        pattern = patternOption.call(this, datum, color);
      }

      // 2. 如果 pattern 不是 CanvasPattern，则进一步处理，否则直接赋予给 fill
      if (pattern instanceof CanvasPattern === false) {
        // 通过 createPattern(PatternStyle) 转换为 CanvasPattern
        pattern = getCanvasPattern(deepAssign({}, { cfg: { backgroundColor: color } }, pattern));
      }

      const styleOption = options[key] as StyleAttr;

      return {
        ...(typeof styleOption === 'function' ? styleOption.call(this, datum, ...args) : styleOption || {}),
        fill: pattern || color,
      };
    };

    return deepAssign({}, params, { options: { [key]: style } });
  };
}
