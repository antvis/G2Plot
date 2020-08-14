import { each, clone, isObject, isFunction } from '@antv/util';
// import { compare } from '../../base/controller/state';

// 对axis label和label样式进行缓存
let labels;
let originAttrs;

function onActive(plot, condition) {
  if (!labels) {
    getAllAxisLabels(plot);
  }
  each(labels, (label) => {
    const { labelData, con } = beforeCompare(label, condition);
    if (compare(labelData, con)) {
      const disableStyle = labelActiveStyle();
      label.shape.attr(disableStyle);
    }
  });
}

function onDisable(plot, condition) {
  if (!labels) {
    getAllAxisLabels(plot);
  }
  each(labels, (label, index) => {
    const { labelData, con } = beforeCompare(label, condition);
    if (compare(labelData, con)) {
      const originAttr = originAttrs[index];
      const disableStyle = labelDisableStyle(originAttr);
      label.shape.attr(disableStyle);
    }
  });
}

function getAllAxisLabels(plot) {
  labels = [];
  originAttrs = [];
  const axes = plot.view.getController('axis')?.getComponents();
  each(axes, (axisComponentOption) => {
    const axis = axisComponentOption.component;
    const labelArr = [];
    const scale = getScale(plot, axis);
    const labelShapes = axis.get('labelRenderer').get('group').get('children');
    each(labelShapes, (shape) => {
      if (shape.type === 'text') {
        labelArr.push({ shape });
        originAttrs.push(shape.attr());
      }
    });
    if (scale) {
      // 取到scale values作为原始数据，避免被label format的影响
      const { ticks, field } = scale;
      each(labelArr, (label, index) => {
        label.value = ticks[index];
        label.scaleField = field;
        label.type = scale.type;
      });
    }
    labels.push(...labelArr);
  });
}

// 获取坐标轴对应的scale
function getScale(plot, axis) {
  const props = plot.options;
  let dim = 'y';
  const position = axis.get('position');
  if (position === 'bottom' || position === 'top') {
    dim = 'x';
  }
  const scaleField = props[`${dim}Field`];
  return plot.view.get('scales')[scaleField];
}

function beforeCompare(label, condition) {
  const labelData = { [label.scaleField]: label.value };
  const con = clone(condition);
  if (label.type === 'time' && isObject(condition) && !isFunction(con.exp)) {
    con.exp = new Date(con.exp).getTime();
  }
  return { labelData, con };
}

function labelDisableStyle(style) {
  const opacity = style.opacity || 1;
  return { opacity: opacity * 0.2 };
}

function labelActiveStyle() {
  return { opacity: 1, fontWeight: 600, fill: 'red' };
}

function compare(origin, condition) {
  if (!isFunction(condition)) {
    const { name, exp } = condition;
    if (!origin[name]) {
      return false;
    }
    if (isFunction(exp)) {
      return exp(origin[name]);
    }
    return origin[name] === exp;
  }
  return condition(origin);
}

export default {
  active: onActive,
  selected: onActive,
  disable: onDisable,
};
