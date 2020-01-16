import { Animate } from '@antv/g2';
import * as _ from '@antv/util';

function liquidMoveIn(shape, animateCfg) {
  const container = shape.get('parent');
  const box = container.getBBox();
  const factor = Math.min(Math.max(0, _.get(animateCfg, 'factor', 0.5)), 1);
  const delay = _.get(animateCfg, 'delay', 0);
  const duration = _.get(animateCfg, 'duration', 800);
  const { callback } = animateCfg;

  const originX = (box.minX + box.maxX) / 2;
  const originY = box.maxY;

  const wrap = container.find((shape) => shape.get('name') == 'wrap');
  const wrapTargetOpacity = wrap.attr('opacity');
  wrap.attr('opacity', 0);
  wrap.animate({ opacity: wrapTargetOpacity }, duration * factor, 'easeLinear', null, delay);

  const waves = container.find((shape) => shape.get('name') == 'waves');
  const wavesTargetMatrix = _.clone(waves.attr('matrix'));
  waves.attr('transform', [
    ['t', -originX, -originY],
    ['s', 1, 0],
    ['t', originX, originY],
  ]);
  waves.animate(
    { matrix: wavesTargetMatrix },
    duration,
    animateCfg.easing,
    () => callback && callback(container, wrap, waves),
    delay
  );
}
liquidMoveIn.animationName = 'liquidMoveIn';
Animate.registerAnimation('appear', 'liquidMoveIn', liquidMoveIn);
