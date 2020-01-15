import * as _ from '@antv/util';
import { Group } from '@antv/g';
import { Global, registerShape } from '@antv/g2';
import { setFillStyle } from '@antv/g2/lib/element/util/shape';
import { ShapeDrawCFG, ShapeMarkerCfg } from '@antv/g2/lib/interface';

function lerp(a, b, factor) {
  return (1 - factor) * a + factor * b;
}

// 获取填充图形的图形属性
function _getFillAttrs(cfg) {
  const defaultAttrs = Global.theme.shape.interval.rect.default;
  const attrs = _.mix({}, defaultAttrs, cfg.style);
  setFillStyle(attrs, cfg);
  return attrs;
}

// 根据矩形关键点绘制 path
function _getRectPath(points, { ratioUpper, ratioLower }) {
  const path = [];
  const firstPoint = points[0];

  const originX = (points[1].x + points[2].x) / 2;
  const factorTop = 1.2;
  const factorBottom = 0.6;

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
  draw(cfg: ShapeDrawCFG, container: Group) {
    const attrs = _getFillAttrs(cfg);
    let path = _getRectPath(cfg.points, _.get(cfg, 'origin._origin.__custom__'));
    path = this.parsePath(path);

    return container.addShape('path', {
      attrs: {
        ...attrs,
        path,
      },
    });
  },

  getMarkerStyle(markerCfg: ShapeMarkerCfg) {
    const isInCircle = markerCfg.isInCircle;
    const markerStyle = {
      symbol: isInCircle ? 'circle' : 'square',
      radius: isInCircle ? 4.5 : 4,
    };
    setFillStyle(markerStyle, markerCfg);

    return markerStyle;
  },
});
