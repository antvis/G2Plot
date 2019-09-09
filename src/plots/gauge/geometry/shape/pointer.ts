import { registerShape } from '@antv/g2';

registerShape('point', 'pointer', {
  draw(cfg, group) {
    // 获取第一个标记点
    let point = cfg.points[0];
    point = this.parsePoint({ ...point, y: 2 / 3 });
    // 获取极坐标系下画布中心点
    const center = this.parsePoint({
      x: 0,
      y: 0,
    });
    const points = [
      [point.x, point.y],
      [center.x + (point.y - center.y) / 16, center.y - (point.x - center.x) / 16],
      [(13 * center.x - point.x) / 12, (13 * center.y - point.y) / 12],
      [center.x - (point.y - center.y) / 16, center.y + (point.x - center.x) / 16],
    ];
    // 绘制指针
    return group.addShape('polygon', {
      attrs: {
        points,
        fill: cfg.color,
      },
    });
  },
});
