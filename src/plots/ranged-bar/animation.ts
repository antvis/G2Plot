import * as G from '@antv/g';
import { Animate } from '@antv/g2';
import * as _ from '@antv/util';

function clipInFromCenter(shape, animateCfg) {
  const bbox = shape.getBBox();
  const centerX = bbox.minX + bbox.width / 2;
  const cliper = new G.Rect({
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
    () => {
      shape.attr('clip', null);
    }
  );
}

clipInFromCenter.animationName = 'clipInFromCenter';

Animate.registerAnimation('appear', 'clipInFromCenter', clipInFromCenter);
