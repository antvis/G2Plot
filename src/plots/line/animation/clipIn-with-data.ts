import { registerAnimation } from '../../../dependents';
import { clone, isFunction } from '@antv/util';

let plotInfo;

function clipingWithData(shape, animateCfg) {
  const geometry = shape.get('element').geometry;
  /** 动画初始状态 */
  const index = shape.get('index');
  const coord = geometry.coordinate;
  const scales = geometry.scales;
  const yScale = scales[plotInfo.options.yField];
  const shapeData = clone(shape.get('origin'));
  setClip(shape, coord);
  const clip = shape.get('clipShape');
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
      shape.setClip(null);
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
  if (isFunction(delay)) {
    delay = animateCfg.delay(index);
  }
  let easing = animateCfg.easing;
  if (isFunction(easing)) {
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
  (animateCfg.onFrame = (ratio) => {
    const position = getPositionByRatio(ratio, shapeData, coord);
    if (!position) return;

    marker.attr('x', position[0] + offsetX);
    marker.attr('y', position[1] + offsetY);
    let yText = getDataByPosition(yScale, position[1], coord);

    // use formatter
    if (yScale.formatter) {
      yText = yScale.formatter(yText);
    }

    marker.attr('text', yText);
  }),
    marker.animate(animateCfg.onFrame, {
      duration: animateCfg.duration,
      easing,
      callback: animateCfg.callback,
      delay,
    });
  if (title) {
    title.animate(
      {
        onFrame: (ratio) => {
          const position = getPositionByRatio(ratio, shapeData, coord);
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

function setClip(shape, coord) {
  const { start, end, height } = coord;
  shape.setClip({
    type: 'rect',
    attrs: {
      x: start.x,
      y: end.y,
      width: 0,
      height,
    },
  });
}

function getPositionByRatio(ratio, dataPoints, coord) {
  const { points } = dataPoints;
  const currentX = coord.start.x + coord.getWidth() * ratio;
  for (let i = 0; i < points.length - 1; i++) {
    const current = points[i];
    const next = points[i + 1];
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

export function getPlotOption(option) {
  plotInfo = option;
}

registerAnimation('clipingWithData', clipingWithData);
