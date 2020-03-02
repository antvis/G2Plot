/** 简化折线点 */
import { registerShape } from '../../dependents';
import { deepMix, mix } from '@antv/util';
import { lineSimplification } from '../../util/math';
import { getSplinePath } from '../../util/path';
import LineParser from './main';
import { getGlobalTheme } from '../../theme';

registerShape('line', 'miniLine', {
  draw(cfg, container) {
    const points = lineSimplification(cfg.points);
    const path = [];
    for (let i = 0; i < points.length; i++) {
      const p = points[i];
      const flag = i === 0 ? 'M' : 'L';
      path.push([flag, p.x, p.y]);
    }
    const style = deepMix(
      {},
      {
        lineJoin: 'round',
        lineCap: 'round',
      },
      cfg.style
    );
    const shape = container.addShape('path', {
      attrs: mix(
        {
          path,
          stroke: cfg.color || getGlobalTheme().defaultColor,
          lineWidth: cfg.size || 2,
        },
        style
      ),
    });
    return shape;
  },
});

registerShape('line', 'miniLineSmooth', {
  draw(cfg, container) {
    const points = lineSimplification(cfg.points);
    const constraint = [
      [0, 0],
      [1, 1],
    ];
    const path = getSplinePath(points, false, constraint);
    const shape = container.addShape('path', {
      attrs: mix(
        {
          path,
          stroke: cfg.color || getGlobalTheme().defaultColor,
          lineWidth: cfg.size || 2,
        },
        cfg.style
      ),
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
    const props = this.plot.options;
    if (props.smooth) {
      this.config.shape = { values: ['miniLineSmooth'] };
    } else {
      this.config.shape = { values: ['miniLine'] };
    }
  }
}
