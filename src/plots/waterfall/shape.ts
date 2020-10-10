import { registerShape } from '@antv/g2';
import { deepMix, get } from '@antv/util';
import { DEFAULT_COLORS } from '../../constant';
import { Point } from '../../types';

/**
 * 牵引线 默认样式
 */
const DEFAULT_LEADER_LINE_STYLE = {
  lineWidth: 1,
  stroke: '#8c8c8c',
  lineDash: [4, 2],
};

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
 * @param cfg
 */
function getFillAttrs(cfg) {
  const defaultAttrs = {
    lineWidth: 0,
    fill: DEFAULT_COLORS.BRAND_COLOR,
    fillOpacity: 0.85,
  };

  return deepMix({}, defaultAttrs, {
    ...cfg.style,
    fill: cfg.color,
    stroke: cfg.color,
    fillOpacity: cfg.opacity,
  });
}

registerShape('interval', 'waterfall', {
  draw(cfg, container) {
    const group = container.addGroup();

    const points = cfg.points as Point[];
    let attrs = getFillAttrs(cfg);

    // ① 绘制柱体
    const rectPath = this.parsePath(getRectPath(points));
    const totalRectCfg = get(cfg.customInfo, 'total');
    /** 最后一个柱子 */
    if (!cfg.nextPoints && !!totalRectCfg) {
      attrs = deepMix({}, attrs, get(totalRectCfg, 'style'));
    }

    group.addShape('path', {
      attrs: {
        ...attrs,
        path: rectPath,
      },
    });

    // ② 绘制连接线
    const leaderLineCfg = get(cfg.customInfo, 'leaderLine');
    if (leaderLineCfg && cfg.nextPoints) {
      const nextPoints = cfg.nextPoints as Point[];
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
          ...deepMix({}, DEFAULT_LEADER_LINE_STYLE, leaderLineCfg.style),
        },
      });
    }

    return group;
  },
});
