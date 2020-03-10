import * as _ from '@antv/util';
import { IGroup } from '@antv/g-canvas';
import { registerShape } from '@antv/g2';
import { ShapeMarkerCfg, ShapeInfo } from '@antv/g2/lib/interface';
import { getStyle } from '@antv/g2/lib/geometry/shape/util/get-style';

function lerp(a, b, factor) {
  return (1 - factor) * a + factor * b;
}

// 根据矩形关键点绘制 path
function _getRectPath(points, { reverse, ratioUpper, ratioLower }) {
  const path = [];
  const firstPoint = points[0];

  const originX = (points[1].x + points[2].x) / 2;
  const factorTop = 1.2;
  const factorBottom = 0.6;

  if (reverse) {
    const tmp = ratioLower;
    ratioLower = ratioUpper;
    ratioUpper = tmp;
  }

  const firstPointX = (firstPoint.x - originX) * lerp(factorBottom, factorTop, ratioLower) + originX;
  path.push(['M', firstPointX, firstPoint.y]);

  for (let i = 1, len = points.length; i < len; i++) {
    let pointX = points[i].x;
    switch (i) {
      case 1:
      case 2:
        pointX = (pointX - originX) * lerp(factorBottom, factorTop, ratioUpper) + originX;
        break;

      case 3:
        pointX = (pointX - originX) * lerp(factorBottom, factorTop, ratioLower) + originX;
        break;
    }
    path.push(['L', pointX, points[i].y]);
  }
  path.push(['L', firstPointX, firstPoint.y]); // 需要闭合
  path.push(['z']);
  return path;
}

registerShape('interval', 'funnel-dynamic-rect', {
  draw(cfg: ShapeInfo, container: IGroup) {
    const style = getStyle(cfg, false, true);
    const custom = _.get(cfg, 'data.__custom__');
    const path = this.parsePath(_getRectPath(cfg.points, custom));

    return container.addShape('path', {
      attrs: {
        ...style,
        path,
      },
    });
  },

  getMarker(markerCfg: ShapeMarkerCfg) {
    const { color, isInPolar } = markerCfg;
    return {
      symbol: isInPolar ? 'circle' : 'square',
      style: {
        r: isInPolar ? 4.5 : 4,
        fill: color,
      },
    };
  },
});
