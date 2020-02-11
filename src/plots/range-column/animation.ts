import * as G from '@antv/g';
import { Animate } from '@antv/g2';
import * as _ from '@antv/util';

// 记录之前的状态
let shapeCache: G.Shape[];

function clipInFromCenterVertical(shape, animateCfg) {
  const bbox = shape.getBBox();
  const centerY = bbox.minY + bbox.height / 2;
  const cliper = new G.Rect({
    attrs: {
      x: bbox.minX,
      y: centerY,
      width: bbox.width,
      height: 0,
    },
  });
  shape.attr('clip', cliper);
  cliper.animate(
    {
      height: bbox.height,
      y: bbox.minY,
    },
    animateCfg.duration,
    animateCfg.easing,
    () => {
      shape.attr('clip', null);
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
  const toPath = _.clone(shape.attr('path'));
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
  _.each(shapeCache, (s) => {
    if (s.id === id) {
      target = s;
    }
  });
  return target;
}

updateFromCenterVertical.animationName = 'updateFromCenterVertical';

Animate.registerAnimation('appear', 'clipInFromCenterVertical', clipInFromCenterVertical);
Animate.registerAnimation('update', 'updateFromCenterVertical', updateFromCenterVertical);
