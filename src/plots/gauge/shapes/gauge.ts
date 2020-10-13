import { registerShape } from '@antv/g2';
import { ShapeInfo } from '@antv/g2/lib/interface';
import { Indicator } from '../types';

// 自定义Shape 部分
registerShape('point', 'gauge-indicator', {
  draw(cfg: ShapeInfo, container) {
    // 使用 customInfo 传递参数
    const indicator = cfg.customInfo.indicator as Indicator;
    const { pointer, pin } = indicator;

    const group = container.addGroup();
    // 获取极坐标系下画布中心点
    const center = this.parsePoint({ x: 0, y: 0 });
    // 绘制指针
    // pointer
    group.addShape('line', {
      attrs: {
        x1: center.x,
        y1: center.y,
        x2: cfg.x,
        y2: cfg.y,
        ...pointer.style,
      },
    });

    // pin
    group.addShape('circle', {
      attrs: {
        x: center.x,
        y: center.y,
        ...pin.style,
      },
    });

    return group;
  },
});
