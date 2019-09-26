import * as _ from '@antv/util';
import { compare } from '../../base/controller/state';

// 对label和label样式进行缓存
let labels;
let originAttrs;

function onActive(plot, condition) {
  if (!labels) {
    getAllLabels(plot);
  }
  _.each(labels, (label, index) => {
    const origin = label.get('origin');
    if (compare(origin, condition)) {
      const originAttr = originAttrs[index];
      const style = _.mix({}, originAttr, { opacity: 1 });
      label.attr(style);
    }
  });
}

function onDisable(plot, condition) {
  if (!labels) {
    getAllLabels(plot);
  }
  _.each(labels, (label, index) => {
    const origin = label.get('origin');
    if (compare(origin, condition)) {
      const originAttr = originAttrs[index];
      const disableStyle = labelDisableStyle(originAttr);
      label.attr(disableStyle);
    }
  });
}

function getAllLabels(plot) {
  labels = [];
  originAttrs = [];
  const geoms = plot.plot.get('elements');
  _.each(geoms, (geom) => {
    const geomLabels = geom.get('labels');
    if (geomLabels) {
      _.each(geomLabels, (label) => {
        labels.push(label);
        originAttrs.push(label.attr());
      });
    }
  });
}

function labelDisableStyle(style) {
  const opacity = style.opacity || 1;
  return { opacity: opacity * 0.2 };
}

export default {
  active: onActive,
  selected: onActive,
  disable: onDisable,
};
