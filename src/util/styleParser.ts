import * as _ from '@antv/util';

function AxisStyleParser(theme, style, dimension) {
  const axisCfg = theme.axis[dimension];
  if (style.line) {
    axisCfg.line = checkNull(axisCfg.line);
    _.deepMix(axisCfg.line, style.line);
  }
  if (style.grid) {
    axisCfg.grid = checkNull(axisCfg.grid);
    _.deepMix(axisCfg.grid, style.grid);
  }
  if (style.label) {
    _.deepMix(axisCfg.label, style.label);
    _.deepMix(axisCfg.label.textStyle, style.label);
  }
  if (style.title) _.deepMix(axisCfg.title, style.title);
  if (style.tickLine) {
    axisCfg.tickLine = checkNull(axisCfg.tickLine);
    _.deepMix(axisCfg.tickLine, style.tickLine);
  }

  // TODO: 这里可以写的更简洁一点

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

function checkNull(cfg) {
  if (cfg === null) {
    return {};
  }
  return cfg;
}

export {AxisStyleParser,
        TooltipStyleParser,
        LabelStyleParser,
        AnnotationStyleParser,
    };
