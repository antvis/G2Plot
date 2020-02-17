import { registerShape } from '@antv/g2';

export function getRectPath(cx, cy, width, height, size) {
  const w = width * size;
  const h = height * size;
  const path = [
    ['M', cx - w / 2, cy + h / 2],
    ['Q', cx - w / 2, cy, cx - w / 2, cy - h / 2],
    ['Q', cx, cy - h / 2, cx + w / 2, cy - h / 2],
    ['Q', cx + w / 2, cy, cx + w / 2, cy + h / 2],
    ['Q', cx, cy + h / 2, cx - w / 2, cy + h / 2],
    ['Z'],
  ];
  return path;
}

export function getCirclePath(x, y, size) {
  const path = [
    ['M', x, y],
    ['l', -size, 0],
    ['a', size, size, 0, 1, 0, size * 2, 0],
    ['a', size, size, 0, 1, 0, -(size * 2), 0],
    ['Z'],
  ];
  return path;
}

export function getCircleCurve(x, y, size) {
  // 计算四个角和中点
  const path = [
    ['M', x - size, y],
    ['Q', x - size, y - size, x, y - size],
    ['Q', x + size, y - size, x + size, y],
    ['Q', x + size, y + size, x, y + size],
    ['Q', x - size, y + size, x - size, y],
    ['Z'],
  ];
  return path;
}

registerShape('polygon', 'rect', {
  draw(cfg, container) {
    const points = this.parsePoints(cfg.points);
    const width = points[2].x - points[0].x;
    const height = points[0].y - points[1].y;
    const centerX = points[0].x + width / 2;
    const centerY = points[1].y + height / 2;
    /*
        const path = [
          ['M', centerX - w / 2, centerY + h / 2],
          ['L', centerX - w / 2, centerY - h / 2],
          ['L', centerX + w / 2, centerY - h / 2],
          ['L', centerX + w / 2, centerY + h / 2],
          ['Z'],
        ];
        */
    const path = getRectPath(centerX, centerY, width, height, cfg.origin.size);
    return container.addShape('path', {
      attrs: {
        path,
        fill: cfg.color,
        opacity: 1,
      },
    });
  },
});

registerShape('point', 'curvePoint', {
  draw(cfg, container) {
    const path = getCirclePath(cfg.x, cfg.y, cfg.size);
    return container.addShape('path', {
      attrs: {
        path,
        fill: cfg.color,
        opacity: 1,
      },
    });
  },
});
