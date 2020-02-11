import * as G from '@antv/g-canvas';
import { registerAnimation } from '@antv/g2';
import * as _ from '@antv/util';

function clipingWithData(shape, animateCfg) {
  console.log(shape,animateCfg);
  /** 动画初始状态 */
  const index = shape.get('index');
  const coord = shape.get('coord');
  const scales = shape.get('scales');
  const yScale = scales[animateCfg.yField];
  const shapeData = _.clone(shape.get('origin'));
  const clip = getClip(coord);
  shape.attr('clip', clip);
  shape.setSilent('animating', true);
  const label = getLineLabel(animateCfg.plot.view, shapeData[0]._origin[animateCfg.seriesField]);
  if (label && !label.get('destroyed')) {
    label.set('visible', false);
  }
  const parent = shape.get('parent');
  const offsetX = 12;
  let title;
  if (animateCfg.seriesField) {
    title = parent.addShape('text', {
      attrs: {
        x: coord.start.x + offsetX,
        y: 0,
        text: shapeData[0]._origin[animateCfg.seriesField],
        fill: shape.attr('stroke'),
        fontSize: 12,
        textAlign: 'start',
        textBaseline: 'middle',
      },
    });
  }
  const offsetY = title ? 16 : 0;
  const marker = parent.addShape('text', {
    attrs: {
      x: coord.start.x + offsetX,
      y: offsetY,
      text: `test${index}`,
      fill: shape.attr('stroke'),
      fontSize: 12,
      textAlign: 'start',
      textBaseline: 'middle',
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
          if (label && !label.get('destroyed')) {
            label.set('visible', true);
            animateCfg.plot.canvas.draw();
          }
        }
      );
      if (title) {
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

        marker.attr('x', position[0] + offsetX);
        marker.attr('y', position[1] + offsetY);
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
          title.attr('x', position[0] + offsetX);
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
  const clip = new G.Shape.Rect({
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
      const y = current.y + m * (currentX - current.x);
      return [currentX, y];
    }
  }
}

function getDataByPosition(scale, y, coord) {
  const yRatio = (y - coord.start.y) / (coord.end.y - coord.start.y);
  return scale.invert(yRatio).toFixed(2);
}

function getLineLabel(view, name) {
  let label;
  const elements = view.get('elements');
  _.each(elements, (e) => {
    if (e.get('type') === 'line') {
      if (e.get('labelController')) {
        const labelContainer = e.get('labelController').labelsContainer;
        if (labelContainer) {
          const labels = labelContainer.get('labelsRenderer').getLabels();
          _.each(labels, (l) => {
            if (l.attr('text') === name) {
              label = l;
            }
          });
        }
      }
    }
  });
  return label;
}

registerAnimation('appear', 'clipingWithData', clipingWithData);
