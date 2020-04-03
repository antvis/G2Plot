import { clone } from '@antv/util';

function AxisStyleParser(axisCfg, axis) {
  axisCfg.line = axis.line?.visible ? { ...axis.line } : null;
  axisCfg.title = axis.title?.visible
    ? {
        ...axis.title,
        autoRotate: axisCfg.autoRotateTitle,
      }
    : null;
  axisCfg.tickLine = axis.tickLine?.visible ? { ...axis.tickLine } : null;
  axisCfg.overlapOrder = [];
  axisCfg.label = axis.label?.visible
    ? {
        ...axis.label,
      }
    : null;

  if (axis.autoRotateLabel) {
    axisCfg.overlapOrder.push('autoRotate');
  }
  if (axisCfg.autoEllipsisLabel) {
    axisCfg.overlapOrder.push('autoEllipsis');
  }
  if (axis.autoHideLabel) {
    axisCfg.overlapOrder.push('autoHide');
  }

  // TODO: grid
  if (axis.grid) {
    if (axis.grid.visible === false) {
      axisCfg.grid = null;
    } else {
      axisCfg.grid = clone(axis.grid);
      if (axis.grid.style) {
        axisCfg.grid = clone(axis.grid.style);
      }
    }
  }
}

function TooltipStyleParser() {
  return;
}

function LabelStyleParser(theme, style) {
  const labelCfg = theme.label;
  labelCfg.textStyle = style;
}

function AnnotationStyleParser() {
  return;
}

export { AxisStyleParser, TooltipStyleParser, LabelStyleParser, AnnotationStyleParser };
