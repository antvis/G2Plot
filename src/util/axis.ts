import * as StyleParser from '../util/styleParser';

export function extractAxis(desAxis, axis) {
  if (!axis) return desAxis;
  if (axis.style) {
    StyleParser.AxisStyleParser(desAxis, axis);
  }
  // formatter
  if (axis.formatter) {
    const textStyle = desAxis.label;
    desAxis.label = function (text, index, total) {
      return {
        text: axis.formatter(text),
        textStyle
      };
    };
    desAxis.label.formatter = axis.formatter;
  }

  return desAxis;
}

export function processAxisVisible(axisCfg) {
  if (axisCfg.line && axisCfg.line.visible === false) {
    axisCfg.line = null;
  }
  if (axisCfg.grid && axisCfg.grid.visible === false) {
    axisCfg.grid = null;
  }
  if (axisCfg.tickLine && axisCfg.tickLine.visible === false) {
    axisCfg.tickLine = null;
  }
  if (axisCfg.title && axisCfg.title.visible === false) {
    axisCfg.title = null;
  }
  if (axisCfg.label && axisCfg.label.visible === false) {
    axisCfg.label = null;
  }
}