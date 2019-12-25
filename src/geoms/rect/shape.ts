import * as _ from '@antv/util';
import { registerShape, registerShapeFactory } from '@antv/g2';

function splitPoints(obj) {
  const points = [];
  const x = obj.x;
  let y = obj.y;
  y = _.isArray(y) ? y : [y];
  _.each(y, (yItem, index) => {
    const point = {
      x: _.isArray(x) ? x[index] : x,
      y: yItem,
    };
    points.push(point);
  });
  return points;
}

function getAttrs(cfg) {
  const attrs = cfg.style;
  setFillStyle(attrs, cfg);
  return attrs;
}

function setFillStyle(attrs, cfg) {
  const { color, opacity } = cfg;
  if (color) {
    attrs.fill = color;
  }
  if (_.isNumber(opacity)) {
    attrs.opacity = attrs.fillOpacity = opacity;
  }
}

function getPath(cfg) {
  const x = cfg.x;
  const y = cfg.y;
  const w = cfg.size[0];
  const h = cfg.size[1];
  const centerX = x + w / 2;
  const centerY = y + w / 2;
  const path = [
    ['M', x - 0.5 * w, y - 0.5 * h],
    ['L', x + 0.5 * w, y - 0.5 * h],
    ['L', x + 0.5 * w, y + 0.5 * h],
    ['L', x - 0.5 * w, y + 0.5 * h],
    ['z'],
  ];
  return path;
}

function getMarkerAttrs(markerCfg) {
  const markerStyle = {
    symbol: 'square',
    radius: 4,
  };
  setFillStyle(markerStyle, markerCfg);
  return markerStyle;
}

// fixme: G2没有导出
const RectShapeFactory: any = registerShapeFactory('rect', {
  defaultShapeType: 'rect',
  getDefaultPoints(pointInfo: any) {
    return splitPoints(pointInfo);
  },
});

registerShape('rect', 'rect', {
  draw(cfg, container) {
    if (!_.isEmpty(cfg.points)) {
      const attrs = getAttrs(cfg);
      const path = getPath(cfg);
      //path = this.parsePath(path);
      const rect = container.addShape('path', {
        attrs: {
          path,
          fill: 'blue',
          stroke: 'black',
          lineWidth: 1,
          opacity: 0.3,
        },
      });
      return rect;
    }
  },
  getMarkerStyle(markerCfg) {
    return getMarkerAttrs(markerCfg);
  },
});

export default RectShapeFactory;
