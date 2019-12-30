import * as G from '@antv/g';
import { Animate } from '@antv/g2';
import * as _ from '@antv/util';

function clipingWithData(shape, animateCfg) {
  /** 动画初始状态 */
  const index = shape.get('index');
  const coord = shape.get('coord');
  const scales = shape.get('scales');
  const yScale = scales[animateCfg.yField];
  const shapeData = _.clone(shape.get('origin'));
  const clip = getClip(coord);
  shape.attr('clip', clip);
  shape.setSilent('animating', true);
  const parent = shape.get('parent');
  let title;
  if (animateCfg.seriesField) {
    title = parent.addShape('text', {
      attrs: {
        x: coord.start.x,
        y: 0,
        text: shapeData[animateCfg.seriesField],
        fill: shape.attr('stroke'),
        fontSize: 14,
        textAlign: 'start',
      },
    });
  }
  const marker = parent.addShape('text', {
    attrs: {
      x: coord.start.x,
      y: 20,
      text: `test${index}`,
      fill: shape.attr('stroke'),
      fontSize: 14,
      textAlign: 'start',
    },
  });
  /** 动画执行之后 */
  animateCfg.callback = () => {
    if (shape && !shape.get('destroyed')) {
      shape.attr('clip', null);
      shape.setSilent('cacheShape', null);
      shape.setSilent('animating', false);
      clip.remove();
      marker.animate(
        {
          opacity: 0,
        },
        300,
        () => {
          marker.remove();
        }
      );
    }
  };
  /** 执行动画 */
  /** 准备动画参数 */
  let delay = animateCfg.delay;
  if (_.isFunction(delay)) {
    delay = animateCfg.delay(index);
  }
  let easing = animateCfg.easing;
  if (_.isFunction(easing)) {
    easing = animateCfg.easing(index);
  }
  /** 动起来 */
  const i = 0;
  clip.animate(
    {
      width: coord.getWidth(),
    },
    animateCfg.duration,
    easing,
    animateCfg.callback,
    delay
  );
  marker.animate(
    {
      onFrame: (ratio) => {
        const position = getPositionByRatio(ratio, shapeData, coord, i);

        if (!position) return;

        marker.attr('x', position[0]);
        marker.attr('y', position[1]);
        let yText = getDataByPosition(yScale, position[1], coord);

        // use formatter
        if (yScale.formatter) {
          yText = yScale.formatter(yText);
        }

        marker.attr('text', yText);
      },
    },
    animateCfg.duration,
    easing,
    animateCfg.callback,
    delay
  );
  if (title) {
    title.animate(
      {
        onFrame: (ratio) => {
          const position = getPositionByRatio(ratio, shapeData, coord, i);
          if (!position) return;
          title.attr('x', position[0]);
          title.attr('y', position[1]);
        },
      },
      animateCfg.duration,
      easing,
      animateCfg.callback,
      delay
    );
  }
}

function getClip(coord) {
  const { start, end, width, height } = coord;
  const clip = new G.Shapes.Rect({
    attrs: {
      x: start.x,
      y: end.y,
      width: 0,
      height,
    },
  });
  clip.set('isClip', true);
  return clip;
}

function getPositionByRatio(ratio, dataPoints, coord, index) {
  const currentX = coord.start.x + coord.getWidth() * ratio;
  for (let i = 0; i < dataPoints.length - 1; i++) {
    const current = dataPoints[i];
    const next = dataPoints[i + 1];
    if (currentX >= current.x && currentX <= next.x) {
      const m = (next.y - current.y) / (next.x - current.x); // 斜率
      /*if(i !== index){
          dataPoints = dataPoints.splice(i,1);
          index = i;
      }*/
      const y = current.y + m * (currentX - current.x);
      return [currentX, y];
    }
  }
}

function getDataByPosition(scale, y, coord) {
  const yRatio = (y - coord.start.y) / (coord.end.y - coord.start.y);
  return scale.invert(yRatio).toFixed(2);
}

Animate.registerAnimation('appear', 'clipingWithData', clipingWithData);
