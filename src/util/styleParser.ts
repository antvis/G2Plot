import * as _ from '@antv/util';

function AxisStyleParser(axisCfg, axis) {
  if (axis.line) {
    if (axis.line.visible === false) {
      axisCfg.line = null;
    } else if (axis.line.style) {
      axisCfg.line = _.clone(axis.line.style);
    }
  }
  if (axis.title) {
    if (axis.title.visible === false) {
      axisCfg.showTitle = false;
    } else {
      if (axis.title.visible === true) {
        axisCfg.showTitle = true;
      }
      if (axisCfg.autoRotate) {
        axisCfg.autoRotateTitle = axisCfg.autoRotate;
      }
      axisCfg.title = _.clone(axis.title);
      if (axisCfg.title.style) {
        axisCfg.title.textStyle = axisCfg.title.style;
        delete axisCfg.title.style;
      }
    }
  }
  if (axis.tickLine) {
    if (axis.tickLine.visible === false) {
      axisCfg.tickLine = null;
    } else if(axis.tickLine.style) {
      axisCfg.tickLine = _.clone(axis.tickLine.style);
    }
  }
  if (axis.hasOwnProperty('autoHideLabel')) {
    axisCfg.autoHideLabel = axis.autoHideLabel;
  }
  if (axis.hasOwnProperty('autoRotateLabel')) {
    axisCfg.autoRotateLabel = axis.autoRotateLabel;
  }
  if (axis.label) {
    const newLabel = _.clone(axis.label);
    if (newLabel.style) {
      newLabel.textStyle = newLabel.style;
      delete newLabel.style;
    }
    if (axis.label.formatter) {
      const textFormatter = axis.label.formatter;
      axisCfg.label = (text) => {
        newLabel.text = textFormatter(text);
        return newLabel;
      }
    } else {
      axisCfg.label = newLabel;
    }
  }
  if (axis.grid) {
    if (axis.grid.visible === false) {
      axisCfg.grid = null;
    } else if(axis.grid.style) {
      axisCfg.grid = _.clone(axis.grid.style);
    }
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
