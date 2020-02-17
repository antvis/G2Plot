import {IShape,Shape} from '@antv/g-canvas';
import { registerAnimation } from '@antv/g2';
import * as _ from '@antv/util';

// 记录之前的状态
let shapeCache: IShape[];

function clipInFromCenter(shape, animateCfg) {
  /*const bbox = shape.getBBox();
  const centerX = bbox.minX + bbox.width / 2;
  const cliper = new Shape({
    type:'rect',
    attrs: {
      x: centerX,
      y: bbox.minY,
      width: 0,
      height: bbox.height,
    },
  });
  shape.attr('clip', cliper);
  cliper.animate(
    {
      width: bbox.width,
      x: bbox.minX,
    },
    animateCfg.duration,
    animateCfg.easing,
    () => {
      shape.attr('clip', null);
    },
    animateCfg.delay
  );*/
}

clipInFromCenter.animationName = 'clipInFromCenter';

export function setShapeCache(shapes) {
  shapeCache = shapes;
}

function updateFromCenter(shape, animateCfg) {
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

updateFromCenter.animationName = 'updateFromCenter';

registerAnimation('clipInFromCenter', clipInFromCenter);
registerAnimation('updateFromCenter', updateFromCenter);
