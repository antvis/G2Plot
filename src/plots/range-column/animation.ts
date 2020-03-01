import { IShape, registerAnimation } from '../../dependents';
import { clone, each } from '@antv/util';

// 记录之前的状态
let shapeCache: IShape[];

function clipInFromCenterVertical(shape, animateCfg) {
  const bbox = shape.getBBox();
  const centerY = bbox.minY + bbox.height / 2;
  shape.setClip({
    type: 'rect',
    attrs: {
      x: bbox.minX,
      y: centerY,
      width: bbox.width,
      height: 0,
    },
  });
  const cliper = shape.get('clipShape');
  cliper.animate(
    {
      height: bbox.height,
      y: bbox.minY,
    },
    animateCfg.duration,
    animateCfg.easing,
    () => {
      shape.setClip(null);
    },
    animateCfg.delay
  );
}

clipInFromCenterVertical.animationName = 'clipInFromCenterVertical';

export function setShapeCache(shapes) {
  shapeCache = shapes;
}

function updateFromCenterVertical(shape, animateCfg) {
  const fromPath = getShapeFromCache(shape).attr('path');
  const toPath = clone(shape.attr('path'));
  shape.attr('path', fromPath);
  shape.animate(
    {
      path: toPath,
    },
    animateCfg.duration,
    animateCfg.easing,
    animateCfg.callback,
    100
  );
}

function getShapeFromCache(shape) {
  const { id } = shape;
  let target;
  each(shapeCache, (s) => {
    if (s.id === id) {
      target = s;
    }
  });
  return target;
}

updateFromCenterVertical.animationName = 'updateFromCenterVertical';

registerAnimation('clipInFromCenterVertical', clipInFromCenterVertical);
registerAnimation('updateFromCenterVertical', updateFromCenterVertical);
