import * as StyleParser from '../util/styleParser';

export function extractAxis(desAxis, field: string, axis, theme) {
  if (!axis) return desAxis;
  /** 配置x轴 */
  // style
  if (axis.style) {
    StyleParser.AxisStyleParser(theme, axis.style, 'bottom');
  }
  // formatter
  if (axis.formatter) {
    const formatter = axis.formatter;
    desAxis.label = function (text, index, total) {
      return {
        text: formatter(text),
      };
    };
  }

  return desAxis;
}
