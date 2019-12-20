import { Animate } from '@antv/g2';
import * as _ from '@antv/util';

function funnelFadeOut(shape, animateCfg) {
  const endState = {
    fillOpacity: 0,
    strokeOpacity: 0,
  };
  const { prepare, callback } = animateCfg;
  animateCfg.callback = () => {
    shape.remove();
    callback && callback(shape);
  };
  prepare && prepare(shape);
  shape.animate(endState, animateCfg.duration, animateCfg.easing, animateCfg.callback, animateCfg.delay);
}

Animate.registerAnimation('leave', 'funnelFadeOut', funnelFadeOut);
