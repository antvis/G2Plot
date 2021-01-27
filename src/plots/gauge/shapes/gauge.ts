import { registerShape, Types } from '@antv/g2';
import { Indicator } from '../types';

// 自定义Shape 部分
registerShape('point', 'gauge-indicator', {
  draw(cfg: Types.ShapeInfo, container) {
    // 使用 customInfo 传递参数
    const { indicator, defaultColor } = cfg.customInfo;
    const { pointer, pin } = indicator as Indicator;

    const group = container.addGroup();
    // 获取极坐标系下画布中心点
    const center = this.parsePoint({ x: 0, y: 0 });
    // 绘制指针
    if (pointer) {
      // pointer
      group.addShape('line', {
        name: 'pointer',
        attrs: {
          x1: center.x,
          y1: center.y,
          x2: cfg.x,
          y2: cfg.y,
          stroke: defaultColor,
          ...pointer.style,
        },
      });
    }

    // pin
    if (pin) {
      group.addShape('circle', {
        name: 'pin',
        attrs: {
          x: center.x,
          y: center.y,
          stroke: defaultColor,
          ...pin.style,
        },
      });
    }
    return group;
  },
});
