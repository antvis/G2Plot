import { Gauge, G2 } from '@antv/g2plot';

const { registerShape, Util } = G2;

// 自定义 Shape 部分
registerShape('point', 'custom-gauge-indicator', {
  draw(cfg, container) {
    // 使用 customInfo 传递参数
    const { indicator, defaultColor } = cfg.customInfo;
    const { pointer } = indicator;

    const group = container.addGroup();
    // 获取极坐标系下画布中心点
    const center = this.parsePoint({ x: 0, y: 0 });
    // 绘制指针
    if (pointer) {
      const { startAngle, endAngle } = Util.getAngle(cfg, this.coordinate);
      const radius = this.coordinate.getRadius();
      const midAngle = (startAngle + endAngle) / 2;
      const { x: x1, y: y1 } = Util.polarToCartesian(center.x, center.y, radius / 15, midAngle + 1 / Math.PI);
      const { x: x2, y: y2 } = Util.polarToCartesian(center.x, center.y, radius / 15, midAngle - 1 / Math.PI);
      const { x, y } = Util.polarToCartesian(center.x, center.y, radius * 0.65, midAngle);

      const path = [['M', center.x, center.y], ['L', x1, y1], ['L', x, y], ['L', x2, y2], ['Z']];
      // pointer
      group.addShape('path', {
        name: 'pointer',
        attrs: {
          path,
          fill: defaultColor,
          ...pointer.style,
        },
      });
    }

    return group;
  },
});

const gauge = new Gauge('container', {
  percent: 0.78,
  range: {
    color: '#30BF78',
  },
  indicator: {
    shape: 'custom-gauge-indicator',
    pointer: {
      style: {
        stroke: '#D0D0D0',
        lineWidth: 1,
        fill: '#D0D0D0',
      },
    },
  },
});

gauge.render();
