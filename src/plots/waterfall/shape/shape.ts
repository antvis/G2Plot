import { get } from '@antv/util';
import { IGroup } from '@antv/g-base';
import { registerShape } from '@antv/g2';
import { Point, ShapeInfo } from '@antv/g2/lib/interface';

function getRectPath(points) {
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

function getFillAttrs(cfg) {
  const defaultAttrs = {
    lineWidth: 5,
    fill: '#1890FF',
    fillOpacity: 0.85,
  };

  return {
    ...defaultAttrs,
    // ...cfg.style,
    // fill: cfg.color,
    // stroke: cfg.color,
    // fillOpacity: cfg.opacity,
  };
}

/** 绘制连接线 */
function drawLeadLine(cfg, group) {
  if (cfg.nextPoints) {
    let linkPath = [
      ['M', cfg.points[2].x, cfg.points[2].y],
      ['L', cfg.nextPoints[0].x, cfg.nextPoints[0].y],
    ];

    if (cfg.nextPoints[0].y === 0) {
      linkPath[1] = ['L', cfg.nextPoints[1].x, cfg.nextPoints[1].y];
    }
    linkPath = this.parsePath(linkPath);
    group.addShape('path', {
      attrs: {
        path: linkPath,
        stroke: '#8c8c8c',
        lineDash: [4, 2],
      },
    });
  }
}

/** 绘制差值label */
function drawDiffLabel(cfg, group) {
  const { data } = cfg;
  const value = Array.isArray(data) ? data[1] - data[0] : data;
}

registerShape('interval', 'waterfall', {
  draw(cfg, container) {
    const attrs = getFillAttrs(cfg);
    let rectPath = getRectPath(cfg.points);
    rectPath = this.parsePath(rectPath);

    const group = container.addGroup();
    group.addShape('path', {
      attrs: {
        ...attrs,
        path: rectPath,
      },
    });

    // 绘制连接线
    drawLeadLine.call(this, cfg, group);
    group.addGroup;
    return group;
  },
});
