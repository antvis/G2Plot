import { each, clone, deepMix } from '@antv/util';
import { groupTransform,transform } from '../../../util/g-util';


const ulMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
const duration = 400;
const easing = 'easeQuadInOut';

export function drillingDown(target, view, callback) {
  const rect = getRect(target);
  const range = getRange(view);

  const xRatio = range.width / rect.width;
  const yRatio = range.height / rect.height;
  const offsetX = (range.minX - rect.minX) * xRatio;
  const offsetY = (range.minY - rect.minY) * yRatio;

  const transformMatrix = transform([
    ['s', xRatio, yRatio],
    ['t', offsetX, offsetY],
  ])

  let geometry = view.geometries[0];
  hideLabel(geometry);
  const tem_container = view.backgroundGroup.addGroup();
  tem_container.set('zIndex', -100);
  tem_container.setClip({
    type:'rect',
    attrs: {
      x: range.minX,
      y: range.minY,
      width: range.width,
      height: range.height,
    },
  });
  const tem_shapes = getTemShapes(geometry, tem_container);
  geometry.container.set('visible', false);
  view.canvas.draw();
  callback();
  window.setTimeout(() => {
    each(tem_shapes, (shape, index) => {
      if (index === 0) {
        shape.animate({matrix:transformMatrix}, duration, easing, () => {
          tem_container.remove();
          view.canvas.draw();
        });
      } else {
        shape.animate(transform, duration);
      }
    });
    geometry = view.geometries[0];
    hideLabel(geometry);
    const shapes = geometry.getShapes();
    each(shapes, (shape) => {
      shape.attr('opacity', 0);
      shape.animate(
        {
          opacity: 1,
        },
        duration,
        easing
      );
    });
    const container = geometry.container;
    container.stopAnimate();
    container.set('visible', true);
    container.attr('matrix', clone(ulMatrix));
    groupTransform(container,[
      ['s', rect.width / range.width, rect.height / range.height],
      ['t', rect.minX, rect.minY],
    ]);
    const matrix = clone(ulMatrix);
    geometry.container.animate(
      {
        matrix,
      },
      duration,
      easing,
      () => {
        showLabel(geometry);
      }
    );
    view.canvas.draw();
  }, 16);
}

function getTemShapes(geometry, container) {
  const shapes = geometry.getShapes();
  const tem_shapes = [];
  each(shapes, (shape) => {
    const s = container.addShape('path', {
      attrs: deepMix({}, shape.attrs, { capture: false }),
    });
    tem_shapes.push(s);
  });
  return tem_shapes;
}

export function rollingUp(name, view, callback) {
  let geometry = view.geometries[0];
  hideLabel(geometry);
  let container = geometry.container;
  container.attr('matrix', clone(ulMatrix));
  const tem_container = view.backgroundGroup.addGroup();
  tem_container.set('zIndex', -100);
  const tem_shapes = getTemShapes(geometry, tem_container);
  container.set('visible', false);
  view.canvas.draw();
  callback();
  geometry = view.geometries[0];
  hideLabel(geometry);
  container = geometry.container;
  const shape = findShapeByName(geometry.getShapes(), name); //根据name获得上一级shape
  const rect = getRect(shape);
  const range = getRange(view);
  const containerParent = container.get('parent');
  if (!containerParent.get('clipShape')) {
    container.setClip({
      type:'rect',
      attrs: {
        x: range.minX,
        y: range.minY,
        width: range.width,
        height: range.height,
      },
    });
  }
  shrinkTemp(tem_container, tem_shapes, rect, range);
  const xRatio = range.width / rect.width;
  const yRatio = range.height / rect.height;
  const offsetX = (range.minX - rect.minX) * xRatio;
  const offsetY = (range.minY - rect.minY) * yRatio;
  const transformMatrix = transform([
    ['s', xRatio, yRatio],
    ['t', offsetX, offsetY],
  ]);
  container.setMatrix(transformMatrix);
  container.set('visible', true);
  container.animate(
    {
      matrix: ulMatrix,
    },
    duration,
    easing,
    () => {
      showLabel(geometry);
    }
  );
}

function findShapeByName(shapes, n) {
  let shape;
  each(shapes, (s) => {
    const { name } = s.get('origin').data;
    if (name === n) {
      shape = s;
    }
  });
  return shape;
}

function getRange(view) {
  const viewRange = view.coordinateBBox;
  const range = {
    minX: viewRange.minX,
    minY: viewRange.minY,
    centerX: (viewRange.maxX - viewRange.minX) / 2,
    centerY: (viewRange.maxY - viewRange.minY) / 2,
    width: viewRange.width,
    height: viewRange.height,
  };
  return range;
}

function getRect(shape) {
  const path = shape.attr('path');
  const x0 = path[0][1];
  const y1 = path[0][2];
  const x1 = path[1][1];
  const y0 = path[2][2];
  const rect = {
    minX: x0,
    minY: y0,
    centerX: (x1 - x0) / 2,
    centerY: (y1 - y0) / 2,
    width: Math.abs(x1 - x0),
    height: Math.abs(y1 - y0),
  };
  return rect;
}

function shrinkTemp(container, shapes, rect, range) {
  const xRatio = rect.width / range.width;
  const yRatio = rect.height / range.height;
  const transformMatrix = transform([
    ['s', xRatio, yRatio],
    ['t', rect.minX, rect.minY],
  ]);
  container.animate({matrix:transformMatrix}, duration, easing, () => {
    container.remove();
  });
  each(shapes, (shape) => {
    shape.animate(
      {
        opacity: 0,
      },
      duration,
      easing
    );
  });
}

function hideLabel(geometry) {
  const labelContainer = geometry.labelsContainer;
  labelContainer.set('visible', false);
}

function showLabel(geometry) {
  const labelContainer = geometry.labelsContainer;
  labelContainer.set('visible', true);
}

