import * as _ from '@antv/util';

function AxisStyleParser(theme, style, dimension) {
  const axisCfg = theme.axis[dimension];
  if (style.line) {
    if (axisCfg.line === null) axisCfg.line = {};
    _.deepMix(axisCfg.line, style.line);
  }
  if (style.grid) _.deepMix(axisCfg.grid, style.grid);
  if (style.label) _.deepMix(axisCfg.label.textStyle, style.label);
  if (style.title) _.deepMix(axisCfg.title, style.title);
  if (style.tickLine) _.deepMix(axisCfg.tickLine, style.tickLine);
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
