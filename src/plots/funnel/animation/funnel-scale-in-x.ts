import { ext } from '@antv/matrix-util';
import { registerAnimation } from '@antv/g2';

function funnelScaleInX(shape, animateCfg) {
  const { duration = 200, delay, easing, callback, reverse } = animateCfg || {};

  const bbox = shape.getBBox();
  const originX = reverse ? bbox.maxX : bbox.minX;
  const originY = (bbox.minY + bbox.maxY) / 2;

  const clip = shape.setClip({
    type: 'rect',
    attrs: {
      x: bbox.x,
      y: bbox.y,
      width: bbox.width,
      height: bbox.height,
    },
  });
  const clipTargetAttrs = {
    matrix: [1, 0, 0, 0, 1, 0, 0, 0, 1],
  };
  clip.setMatrix(
    ext.transform(clip.getMatrix(), [
      ['t', -originX, -originY],
      ['s', 0, 1],
      ['t', originX, originY],
    ])
  );

  const shapeTargetAttrs = {
    fillOpacity: shape.attr('fillOpacity'),
    strokeOpacity: shape.attr('strokeOpacity'),
    opacity: shape.attr('opacity'),
  };
  shape.attr({
    fillOpacity: 0,
    strokeOpacity: 0,
    opacity: 0,
  });

  clip.animate(clipTargetAttrs, {
    duration: 200,
    easing,
    callback() {
      shape.setClip(null);
      clip.remove();
    },
    delay,
  });

  shape.animate(shapeTargetAttrs, { duration, easing, delay });

  callback && setTimeout(() => callback(shape), duration + delay);
}

funnelScaleInX.animationName = 'funnelScaleInX';
registerAnimation('funnelScaleInX', funnelScaleInX);
