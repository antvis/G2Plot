import { registerShape } from '@antv/g2';

const POINTER_RADIUS = 10;
const POINTER_LINE_WIDTH = 4;

registerShape('point', 'pointer', {
  draw(cfg, group) {
    const point = cfg.points[0];
    const center = this.parsePoint({
      x: 0,
      y: 0,
    });
    const target = this.parsePoint({
      x: point.x,
      y: 0.5,
    });
    const dir_vec = {
      x: center.x - target.x,
      y: center.y - target.y,
    };
    //normalize
    const length = Math.sqrt(dir_vec.x * dir_vec.x + dir_vec.y * dir_vec.y);
    dir_vec.x *= 1 / length;
    dir_vec.y *= 1 / length;
    //rotate dir_vector by -90 and scale
    const angle1 = -Math.PI / 2;
    const x_1 = Math.cos(angle1) * dir_vec.x - Math.sin(angle1) * dir_vec.y;
    const y_1 = Math.sin(angle1) * dir_vec.x + Math.cos(angle1) * dir_vec.y;
    //rotate dir_vector by 90 and scale
    const angle2 = Math.PI / 2;
    const x_2 = Math.cos(angle2) * dir_vec.x - Math.sin(angle2) * dir_vec.y;
    const y_2 = Math.sin(angle2) * dir_vec.x + Math.cos(angle2) * dir_vec.y;
    // startx
    const angle = Math.atan2(dir_vec.y, dir_vec.x);
    const offset = POINTER_LINE_WIDTH / 2 - POINTER_RADIUS;
    const startX = center.x + Math.cos(angle) * offset;
    const startY = center.y + Math.sin(angle) * offset;
    //polygon vertex
    const path = [
      ['M', target.x + x_1 * 1, target.y + y_1 * 1],
      ['L', startX + x_1 * 3, startY + y_1 * 3],
      ['L', startX + x_2 * 3, startY + y_2 * 3],
      ['L', target.x + x_2 * 1, target.y + y_2 * 1],
      ['Z'],
    ];
    group.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        r: POINTER_RADIUS,
        lineWidth: POINTER_LINE_WIDTH,
        stroke: cfg.color,
      },
    });
    const tick = group.addShape('path', {
      attrs: {
        path: path,
        fill: cfg.color,
      },
    });
    return tick;
  },
});
