import * as StyleParser from '../util/style-parser';

export function extractAxis(desAxis, axis) {
  if (!axis) {
    return desAxis;
  }
  StyleParser.AxisStyleParser(desAxis, axis);
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
