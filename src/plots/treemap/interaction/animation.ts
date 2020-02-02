import { each, clone, deepMix } from '@antv/util';
import { Rect } from '@antv/g';

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

  const transform = {
    transform: [
      ['s', xRatio, yRatio],
      ['t', offsetX, offsetY],
    ],
  };
  let geometry = view.get('elements')[0];
  hideLabel(geometry);
  const tem_cliper = new Rect({
    attrs: {
      x: range.minX,
      y: range.minY,
      width: range.width,
      height: range.height,
    },
  });
  const tem_container = view.get('container').addGroup();
  tem_container.set('zIndex', -100);
  tem_container.attr('clip', tem_cliper);
  const tem_shapes = getTemShapes(geometry, tem_container);
  geometry.get('container').set('visible', false);
  view.get('canvas').draw();
  callback();
  window.setTimeout(() => {
    each(tem_shapes, (shape, index) => {
      if (index === 0) {
        shape.animate(transform, duration, easing, () => {
          tem_container.remove();
          view.get('canvas').draw();
        });
      } else {
        shape.animate(transform, duration);
      }
    });
    geometry = view.get('elements')[0];
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
    const container = geometry.get('container');
    container.stopAnimate();
    container.set('visible', true);
    container.attr('matrix', clone(ulMatrix));
    container.transform([
      ['s', rect.width / range.width, rect.height / range.height],
      ['t', rect.minX, rect.minY],
    ]);
    const matrix = clone(ulMatrix);
    geometry.get('container').animate(
      {
        matrix,
      },
      duration,
      easing,
      () => {
        showLabel(geometry);
      }
    );
    view.get('canvas').draw();
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
  let geometry = view.get('elements')[0];
  hideLabel(geometry);
  let container = geometry.get('container');
  container.attr('matrix', clone(ulMatrix));
  const tem_container = view.get('container').addGroup();
  tem_container.set('zIndex', -100);
  const tem_shapes = getTemShapes(geometry, tem_container);
  container.set('visible', false);
  view.get('canvas').draw();
  callback();
  geometry = view.get('elements')[0];
  hideLabel(geometry);
  container = geometry.get('container');
  const shape = findShapeByName(geometry.getShapes(), name); //根据name获得上一级shape
  const rect = getRect(shape);
  const range = getRange(view);
  const cliper = new Rect({
    attrs: {
      x: range.minX,
      y: range.minY,
      width: range.width,
      height: range.height,
    },
  });
  const containerParent = container.get('parent');
  if (!containerParent.attr('clip')) {
    containerParent.attr('clip', cliper);
  }
  shrinkTemp(tem_container, tem_shapes, rect, range);
  const xRatio = range.width / rect.width;
  const yRatio = range.height / rect.height;
  const offsetX = (range.minX - rect.minX) * xRatio;
  const offsetY = (range.minY - rect.minY) * yRatio;
  container.transform([
    ['s', xRatio, yRatio],
    ['t', offsetX, offsetY],
  ]);
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
    const { name } = s.get('origin')._origin;
    if (name === n) {
      shape = s;
    }
  });
  return shape;
}

function getRange(view) {
  const viewRange = view.get('viewRange');
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
  const transform = {
    transform: [
      ['s', xRatio, yRatio],
      ['t', rect.minX, rect.minY],
    ],
  };
  container.animate(transform, duration, easing, () => {
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
  const labelContainer = geometry.get('labelController').labelsContainer;
  labelContainer.set('visible', false);
}

function showLabel(geometry) {
  const labelContainer = geometry.get('labelController').labelsContainer;
  labelContainer.set('visible', true);
}
