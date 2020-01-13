import * as G from '@antv/g';
import { Animate } from '@antv/g2';
import * as _ from '@antv/util';

function funnelScaleInY(shape, animateCfg, coord) {
  const { duration = 200, easing, callback, reverse } = animateCfg || {};

  const box = shape.getBBox();
  const originX = (box.minX + box.maxX) / 2;
  const originY = reverse ? box.minY : box.maxY;

  const shapeIndex = shape.get('index');

  const clip = getClip(coord);
  const clipTargetMatrix = _.clone(clip.attr('matrix'));
  clip.attr('transform', [
    ['t', -originX, -originY],
    ['s', 1, 0],
    ['t', originX, originY],
  ]);
  const shapeTargetFillOpacity = shape.attr('fillOpacity');
  shape.attr('fillOpacity', 0);

  shape.attr('clip', clip);

  clip.animate(
    {
      matrix: clipTargetMatrix,
    },
    duration,
    easing,
    () => {
      clip.remove();
      shape.attr('clip', null);
    },
    shapeIndex * duration
  );

  shape.animate(
    {
      fillOpacity: shapeTargetFillOpacity,
    },
    duration,
    easing,
    null,
    shapeIndex * duration
  );

  callback && setTimeout(() => callback(shape), duration + shapeIndex * duration);
}

function getClip(coord) {
  const { start, end, width, height } = coord;
  const clip = new G.Shapes.Rect({
    attrs: {
      x: start.x,
      y: end.y,
      width,
      height,
    },
  });
  return clip;
}

funnelScaleInY.animationName = 'funnelScaleInY';
Animate.registerAnimation('appear', 'funnelScaleInY', funnelScaleInY);
