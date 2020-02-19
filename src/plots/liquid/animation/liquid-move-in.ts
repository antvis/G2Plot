import { registerAnimation } from '@antv/g2';
import {get,clone} from '@antv/util';
import { transform } from '../../../util/g-util';

function liquidMoveIn(shape, animateCfg) {
  const container = shape.get('parent');
  const box = container.getBBox();
  const factor = Math.min(Math.max(0, get(animateCfg, 'factor', 0.5)), 1);
  const delay = get(animateCfg, 'delay', 0);
  const duration = get(animateCfg, 'duration', 800);
  const { callback } = animateCfg;

  const originX = (box.minX + box.maxX) / 2;
  const originY = box.maxY;

  const wrap = container.find((shape) => shape.get('name') == 'wrap');
  const wrapTargetOpacity = wrap.attr('opacity');
  wrap.attr('opacity', 0);
  wrap.animate({ opacity: wrapTargetOpacity }, duration * factor, 'easeLinear', null, delay);
  const waves = container.find((shape) => shape.get('name') == 'waves');
  const wavesTargetMatrix = clone(waves.attr('matrix')) || [1, 0, 0, 0, 1, 0, 0, 0, 1];
  const transformMatrix = transform(wavesTargetMatrix, [
    ['t', -originX, -originY],
    ['s', 1, 0],
    ['t', originX, originY]
  ]);
  waves.setMatrix(transformMatrix);
  waves.animate(
    { matrix: wavesTargetMatrix },
    duration,
    animateCfg.easing,
    () => callback && callback(container, wrap, waves),
    delay
  );

}
liquidMoveIn.animationName = 'liquidMoveIn';
registerAnimation('liquidMoveIn', liquidMoveIn);
