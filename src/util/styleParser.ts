import * as _ from '@antv/util';

function AxisStyleParser(theme, style, dimension) {
  const axisCfg = theme.axis[dimension];
  if (style.line) _.assign(axisCfg.line, style.line);
  if (style.grid) _.assign(axisCfg.grid, style.grid);
  if (style.label) {
    _.assign(axisCfg.label, style.label);
    _.assign(axisCfg.label.textStyle, style.label);
  }
  if (style.title) _.assign(axisCfg.title, style.title);
  if (style.tickLine) _.assign(axisCfg.tickLine, style.tickLine);
  
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

function TooltipStyleParser() {

}

function LabelStyleParser(theme, style) {
  const labelCfg = theme.label;
  labelCfg.textStyle = style;
}

function AnnotationStyleParser() {

}

export {AxisStyleParser,
        TooltipStyleParser,
        LabelStyleParser,
        AnnotationStyleParser,
    };
