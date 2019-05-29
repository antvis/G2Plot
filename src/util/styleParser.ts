import * as _ from '@antv/util';

function AxisStyleParser(axisCfg, axis) {
  _.deepMix(axisCfg, axis);
  // const axisCfg = _.clone(axis);
  const style = axis.style;

  if (!style) {
    return axisCfg;
  }
  _.deepMix(axisCfg, style);

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

  delete axisCfg.style;
  return axisCfg;
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
