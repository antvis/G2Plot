/** 简化折线点 */
import * as G2 from '@antv/g2';
import { distBetweenPointLine } from '../../util/math';
import { getSplinePath } from '../../util/path';
import LineParser from './main';

const THRESHOLD = 4;

G2.registerShape('line', 'miniLine', {
    draw: (cfg, container) => {
      const points = lineSimplification(cfg.points);
      const path = [];
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const flag = i === 0 ? 'M' : 'L';
        path.push([ flag, p.x, p.y ]);
      }
      const shape = container.addShape('path', {
        attrs: {
          path,
          stroke: cfg.color,
          lineWidth: cfg.size
        }
      });
      return shape;
    }
});

G2.registerShape('line', 'miniLineSmooth', {
    draw: (cfg, container) => {
      const points = lineSimplification(cfg.points);
      const path = parseSplineShape(points);
      const shape = container.addShape('path', {
        attrs: {
          path,
          stroke: cfg.color,
          lineWidth: cfg.size
        }
      });
      return shape;
    }
});


function lineSimplification(points) {
    if (points.length < 5) {
      return points;
    }
    return DouglasPeucker(points, THRESHOLD);
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
      result = [ points[0], points[points.length - 1] ];
    }
    return result;
}

function parseSplineShape(points) {
    const constraint = [
      [ 0, 0 ],
      [ 1, 1 ],
    ];
    return getSplinePath(points, false, constraint);
}

export default class MiniLineParser extends LineParser {

  public init(){
    super.init();
    this.parseShape();
  }

  private parseShape(){
    const props = this.plot._initialProps;
    if (props.smooth) {
      this.config.shape = { values: [ 'miniLineSmooth' ] };
    }else{
      this.config.shape = { values: ['miniLine'] };
    }
  }
  
}