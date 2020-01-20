import { each, clone, deepMix } from '@antv/util';

const ulMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];
const duration = 300;

export function scale(target, container, view, callback) {
  const path = target.attr('path');
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
  const viewRange = view.get('viewRange');
  const range = {
    minX: viewRange.minX,
    minY: viewRange.minY,
    centerX: (viewRange.maxX - viewRange.minX) / 2,
    centerY: (viewRange.maxY - viewRange.minY) / 2,
    width: viewRange.width,
    height: viewRange.height,
  };

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
  const tem_container = view.get('container').addGroup();
  tem_container.set('zIndex', -100);
  const tem_shapes = getTemShapes(geometry, tem_container);
  geometry.get('container').set('visible', false);
  view.get('canvas').draw();
  callback();
  window.setTimeout(() => {
    each(tem_shapes, (shape, index) => {
      if (index === 0) {
        shape.animate(transform, duration, () => {
          tem_container.remove();
          view.get('canvas').draw();
        });
      } else {
        shape.animate(transform, duration);
      }
    });
    geometry = view.get('elements')[0];
    const shapes = geometry.getShapes();
    each(shapes, (shape) => {
      shape.attr('opacity', 0);
      shape.animate(
        {
          opacity: 1,
        },
        duration
      );
    });
    geometry.get('container').set('visible', true);
    geometry.get('container').transform([
      ['s', rect.width / range.width, rect.height / range.height],
      ['t', rect.minX, rect.minY],
    ]);
    const matrix = clone(ulMatrix);
    geometry.get('container').animate(
      {
        matrix,
      },
      duration
    );
    view.get('canvas').draw();
  }, 40);
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
