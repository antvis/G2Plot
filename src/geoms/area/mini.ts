/** 简化折线点 */
import * as G2 from '@antv/g2';
import * as _ from '@antv/util';
import { rgb2arr } from '../../util/color';
import { lineSimplification } from '../../util/math';
import { getSplinePath } from '../../util/path';
import AreaParser from './main';

const G2DefaultTheme = G2.Global.theme;

G2.registerShape('area', 'miniArea', {
  draw(cfg, container) {
    const path = getPath(cfg, this, false);
    const shape = container.addShape('path', {
      attrs: {
        path,
        fill: parseGradient(cfg.color || G2DefaultTheme.defaultColor),
        opacity: cfg.opacity || 0.4,
      },
    });
    return shape;
  },
});

G2.registerShape('area', 'miniAreaSmooth', {
  draw(cfg, container) {
    const path = getPath(cfg, this, true);
    const shape = container.addShape('path', {
      attrs: {
        path,
        fill: parseGradient(cfg.color || G2DefaultTheme.defaultColor),
        opacity: cfg.opacity || 0.5,
      },
    });
    return shape;
  },
});

function getPath(cfg, shape, isSmooth) {
  const constraint = [[0, 0], [1, 1]];
  let topLinePoints = [];
  let bottomLinePoints = [];
  _.each(cfg.points, (point) => {
    topLinePoints.push(point[1]);
    bottomLinePoints.push(point[0]);
  });
  bottomLinePoints = shape.parsePoints(bottomLinePoints.reverse());
  topLinePoints = lineSimplification(shape.parsePoints(topLinePoints));
  const topPath = isSmooth ? getSplinePath(topLinePoints, false, constraint) : getStraightPath(topLinePoints);
  const bottomPath = getStraightPath(bottomLinePoints);
  bottomPath[0][0] = 'L';
  const path = topPath.concat(bottomPath);

  return path;
}

function getStraightPath(points) {
  const path = [];
  for (let i = 0; i < points.length; i++) {
    const p = points[i];
    const flag = i === 0 ? 'M' : 'L';
    path.push([flag, p.x, p.y]);
  }
  return path;
}

function parseGradient(color) {
  return `l(90) 0:${color} 1:#ffffff`;
}

export default class MiniAreaParser extends AreaParser {
  public init() {
    super.init();
    this.parseShape();
  }

  private parseShape() {
    const props = this.plot._initialProps;
    if (props.smooth) {
      this.config.shape = { values: ['miniAreaSmooth'] };
    } else {
      this.config.shape = { values: ['miniArea'] };
    }
  }
}
