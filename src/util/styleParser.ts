import * as _ from '@antv/util';

function AxisStyleParser(theme, style, dimension) {
  const axisCfg = theme.axis[dimension];
  if (style.line) {
    if (axisCfg.line === null) axisCfg.line = {};
    _.assign(axisCfg.line, style.line);
  }
  if (style.grid) _.assign(axisCfg.grid, style.grid);
  if (style.label) _.assign(axisCfg.label.textStyle, style.label);
  if (style.title) _.assign(axisCfg.title, style.title);
  if (style.tickLine) _.assign(axisCfg.tickLine, style.tickLine);
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
