import { each } from '@antv/util';

const ulMatrix = [1, 0, 0, 0, 1, 0, 0, 0, 1];

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

  const geometry = view.get('elements')[0];
  const shapes = geometry.getShapes();

  each(shapes, (shape, index) => {
    if (index === 0) {
      shape.animate(transform, 300, () => {
        triggerCallback(container, callback);
      });
    } else {
      shape.animate(transform, 300);
    }
  });

  /*container.animate(transform,300,()=>{
        triggerCallback(container,callback);
    });*/
}

function triggerCallback(container, callback) {
  window.setTimeout(() => {
    callback();
    //container.attr('matrix',ulMatrix);
  }, 200);
}
