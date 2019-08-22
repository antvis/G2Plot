import { getTheme } from '@antv/g2';
import * as G2 from '@antv/g2';
import { Canvas } from '@antv/g';
import { income } from '../data/income';
import { distBetweenPointLine } from '../../src/util/math';
import { getSplinePath } from '../../src/util/path';

G2.Shape.registerShape('line', 'miniLine', {
  draw: (cfg, container) => {
    const points = lineSimplification(cfg.points);
    /* const path = [];
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const flag = i === 0 ? 'M' : 'L';
      path.push([ flag, p.x, p.y ]);
    }*/
    const path = parseSplineShape(points);
    const shape = container.addShape('path', {
      attrs: {
        path,
        stroke: cfg.color,
        lineWidth: cfg.size,
      },
    });
    return shape;
  },
});

function parseSplineShape(points) {
  const constraint = [[0, 100], [200, 0]];
  return getSplinePath(points, false, constraint);
}

function lineSimplification(points) {
  const threshold = 4;
  if (points.length < 5) {
    return points;
  }
  return DouglasPeucker(points, threshold);
}

// https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm
function DouglasPeucker(points, threshold) {
  let result;
  let max = -Infinity;
  let index = 0;
  const endIndex = points.length - 1;
  for (let i = 1; i < endIndex; i++) {
    const point = points[i];
    const line = { start: points[0], end: points[endIndex] };
    const dist = distBetweenPointLine(point, line.start, line.end);
    if (dist > max) {
      max = dist;
      index = i;
    }
  }

  if (max > threshold) {
    const list1 = DouglasPeucker(points.slice(0, index + 1), threshold);
    const list2 = DouglasPeucker(points.slice(index, points.length), threshold);
    result = list1.concat(list2);
  } else {
    result = [points[0], points[points.length - 1]];
  }

  return result;
}

const theme = getTheme('default');

describe('mini line shape', () => {
  const canvasDiv = document.createElement('div');
  canvasDiv.style.width = '200px';
  canvasDiv.style.height = '100px';
  canvasDiv.id = 'canvas';
  document.body.appendChild(canvasDiv);
  const canvas = new Canvas({
    containerDOM: canvasDiv,
    width: 200,
    height: 100,
  });
  it.only('test', () => {
    const plot = new G2.View({
      canvas,
      container: canvas.addGroup(),
      start: { x: 0, y: 0 },
      end: { x: 200, y: 100 },
      padding: 0,
      data: income,
      theme,
      options: {
        coord: { type: 'cartesian' },
        scales: {
          time: { type: 'time' },
          rate: { type: 'linear' },
        },
        elements: [
          {
            type: 'line',
            position: {
              fields: ['time', 'rate'],
            },
            color: {
              values: ['blue'],
            },
            size: {
              values: [2],
            },
            shape: {
              values: ['miniLine'],
            },
          },
        ],
      },
    });
    plot.render();
  });
});
