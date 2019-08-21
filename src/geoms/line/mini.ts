/** 简化折线点 */
import * as G2 from '@antv/g2';
import { lineSimplification } from '../../util/math';
import { getSplinePath } from '../../util/path';
import LineParser from './main';

const G2DefaultTheme = G2.Global.theme;

G2.registerShape('line', 'miniLine', {
  draw(cfg, container) {
    const points = lineSimplification(cfg.points);
    const path = [];
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const flag = i === 0 ? 'M' : 'L';
      path.push([flag, p.x, p.y]);
    }
    const shape = container.addShape('path', {
      attrs: {
        path,
        stroke: cfg.color || G2DefaultTheme.defaultColor,
        lineWidth: cfg.size || 2,
      },
    });
    return shape;
  },
});

G2.registerShape('line', 'miniLineSmooth', {
  draw(cfg, container) {
    const points = lineSimplification(cfg.points);
    const constraint = [[0, 0], [1, 1]];
    const path = getSplinePath(points, false, constraint);
    const shape = container.addShape('path', {
      attrs: {
        path,
        stroke: cfg.color || G2DefaultTheme.defaultColor,
        lineWidth: cfg.size || 2,
      },
    });
    return shape;
  },
});

export default class MiniLineParser extends LineParser {
  public init() {
    super.init();
    this.parseShape();
  }

  private parseShape() {
    const props = this.plot._initialProps;
    if (props.smooth) {
      this.config.shape = { values: ['miniLineSmooth'] };
    } else {
      this.config.shape = { values: ['miniLine'] };
    }
  }
}
