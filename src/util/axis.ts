import * as StyleParser from '../util/styleParser';

export function extractAxis(desAxis, axis, theme, dimension) {
  if (!axis) return desAxis;
  if (axis.style) {
    StyleParser.AxisStyleParser(theme, axis.style, dimension);
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
