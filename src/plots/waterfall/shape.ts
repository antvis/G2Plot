import { IGroup } from '@antv/g-base';
import { registerShape, Types } from '@antv/g2';
import { get } from '@antv/util';
import { Point } from '../../types';
import { deepAssign } from '../../utils';

/**
 * 获取柱子 path
 * @param points
 */
function getRectPath(points: Point[]) {
  const path = [];
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    if (point) {
      const action = i === 0 ? 'M' : 'L';
      path.push([action, point.x, point.y]);
    }
  }

  const first = points[0];
  path.push(['L', first.x, first.y]);
  path.push(['z']);

  return path;
}

/**
 * 获取填充属性
 * @param cfg 图形绘制数据
 */
function getFillAttrs(cfg: Types.ShapeInfo) {
  return deepAssign({}, cfg.defaultStyle, cfg.style, { fill: cfg.color });
}

registerShape('interval', 'waterfall', {
  draw(cfg: Types.ShapeInfo & { points: Point[]; nextPoints: Point[] }, container: IGroup) {
    const { customInfo, points, nextPoints } = cfg;

    const group = container.addGroup();

    // ① 绘制柱体
    const rectPath = this.parsePath(getRectPath(points));
    const fillAttrs = getFillAttrs(cfg);

    group.addShape('path', {
      attrs: {
        ...fillAttrs,
        path: rectPath,
      },
    });

    // ② 绘制连接线
    const leaderLineCfg = get(customInfo, 'leaderLine');
    if (leaderLineCfg && nextPoints) {
      let linkPath = [
        ['M', points[2].x, points[2].y],
        ['L', nextPoints[0].x, nextPoints[0].y],
      ];

      if (points[2].y === nextPoints[1].y) {
        linkPath[1] = ['L', nextPoints[1].x, nextPoints[1].y];
      }

      linkPath = this.parsePath(linkPath);
      group.addShape('path', {
        attrs: {
          path: linkPath,
          ...(leaderLineCfg.style || {}),
        },
      });
    }

    return group;
  },
});
