/**
 * Create By Bruce Too
 * On 2020-02-18
 */
import * as _ from '@antv/util';
import { IGroup, registerShape, Point, ShapeInfo } from '../../../../dependents';

function getStyle(cfg: ShapeInfo, isStroke: boolean, isFill: boolean) {
  const { style, defaultStyle, color } = cfg;
  const attrs = {
    ...defaultStyle,
    ...style,
  };
  if (color) {
    if (isStroke) {
      attrs.stroke = color;
    }
    if (isFill) {
      attrs.fill = color;
    }
  }
  return attrs;
}

function getRectPath(points: Point[]) {
  const path = [];
  const firstPoint = points[0];
  path.push(['M', firstPoint.x, firstPoint.y]);
  for (let i = 1, len = points.length; i < len; i++) {
    path.push(['L', points[i].x, points[i].y]);
  }
  path.push(['L', firstPoint.x, firstPoint.y]); // 需要闭合
  path.push(['z']);
  return path;
}

// @ts-ignore
registerShape('interval', 'waterfall', {
  // @ts-ignore
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = getStyle(cfg, false, true);
    const path = this.parsePath(getRectPath(cfg.points as Point[]));
    const shape = container.addShape('path', {
      attrs: {
        ...style,
        path,
      },
      name: 'interval',
    });
    const leaderLine = _.get(cfg.style, 'leaderLine');
    if (leaderLine && leaderLine.visible) {
      const lineStyle = leaderLine.style || {};
      // 2. 虚线连线
      if (cfg.nextPoints) {
        let linkPath = [
          // @ts-ignore
          ['M', cfg.points[2].x, cfg.points[2].y],
          // @ts-ignore
          ['L', cfg.nextPoints[0].x, cfg.nextPoints[0].y],
        ];
        linkPath = this.parsePath(linkPath);
        container.addShape('path', {
          attrs: {
            path: linkPath,
            stroke: '#d3d3d3',
            lineDash: [4, 2],
            lineWidth: 1,
            ...lineStyle,
          },
          name: 'leader-line',
        });
      }
    }
    return shape;
  },
});
