import { Animate } from '@antv/g2';
import * as _ from '@antv/util';

function liquidMoveIn(shape, animateCfg) {
  const container = shape.get('parent');
  const box = container.getBBox();
  const delay = _.get(animateCfg, 'delay', 0);
  const factor = Math.min(Math.max(0, _.get(animateCfg, 'factor', 0.5)), 1);
  const duration = _.get(animateCfg, 'duration', 800);

  const originX = (box.minX + box.maxX) / 2;
  const originY = box.maxY;

  const wrap = container.find((shape) => shape.get('role') == 'wrap');
  const wrapTargetOpacity = wrap.attr('opacity');
  wrap.attr('opacity', 0);
  wrap.animate({ opacity: wrapTargetOpacity }, duration * factor, 'easeLinear', null, delay);

  const waves = container.findAll((shape) => shape.get('role') == 'wave');
  waves.forEach((wave) => {
    const waveTargetMatrix = _.clone(wave.attr('matrix'));
    wave.attr('transform', [
      ['t', -originX, -originY],
      ['s', 1, 0],
      ['t', originX, originY],
    ]);
    wave.animate(
      { matrix: waveTargetMatrix, repeat: false },
      duration,
      animateCfg.easing,
      () => wave.animate(wave.get('anim').attrs, wave.get('anim').delay),
      delay
    );
  });
}

Animate.registerAnimation('appear', 'liquidMoveIn', liquidMoveIn);
