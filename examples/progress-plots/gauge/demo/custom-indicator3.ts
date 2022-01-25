import { Gauge, G2 } from '@antv/g2plot';

const { Util, registerShape } = G2;
// 自定义 Shape 部分
registerShape('point', 'custom-gauge-indicator', {
  draw(cfg, container) {
    // 使用 customInfo 传递参数
    const { indicator, defaultColor } = cfg.customInfo;
    const { pointer, pin } = indicator;

    const group = container.addGroup();
    // 获取极坐标系下画布中心点
    const center = this.parsePoint({ x: 0, y: 0 });

    if (pin) {
      const pinStyle = pin.style || {};
      const { lineWidth = 2, fill = defaultColor } = pinStyle;
      const r = 6;
      group.addShape('circle', {
        name: 'pin-outer',
        attrs: {
          x: center.x,
          y: center.y,
          ...pin.style,
          fill,
          r: r * 1.5,
          lineWidth,
        },
      });
    }
    // 绘制指针
    if (pointer) {
      const { startAngle, endAngle } = Util.getAngle(cfg, this.coordinate);
      const radius = this.coordinate.getRadius();
      const midAngle = (startAngle + endAngle) / 2;
      const { x: x1, y: y1 } = Util.polarToCartesian(center.x, center.y, radius / 15, midAngle + 1 / Math.PI);
      const { x: x2, y: y2 } = Util.polarToCartesian(center.x, center.y, radius / 15, midAngle - 1 / Math.PI);
      const { x, y } = Util.polarToCartesian(center.x, center.y, radius * 0.65, midAngle);
      const { x: x0, y: y0 } = Util.polarToCartesian(center.x, center.y, radius * 0.1, midAngle + Math.PI);
      const sa = Math.PI / 2 + midAngle;
      const r1 = 5.5;
      const p1 = {
        x: center.x + Math.cos(sa) * r1,
        y: center.y + Math.sin(sa) * r1,
      };
      const p2 = {
        x: center.x - Math.cos(sa) * r1,
        y: center.y - Math.sin(sa) * r1,
      };
      const r2 = r1 / 4;
      const p11 = {
        x: x + Math.cos(sa) * r2,
        y: y + Math.sin(sa) * r2,
      };
      const p21 = {
        x: x - Math.cos(sa) * r2,
        y: y - Math.sin(sa) * r2,
      };

      const path = [
        ['M', p21.x, p21.y],
        // 参数信息: cx, cy, .., .., .., endPointX, endPointY
        ['A', r2, r2, 0, 0, 1, p11.x, p11.y],
        ['L', p1.x, p1.y],
        ['A', r1, r1, 0, 0, 1, p2.x, p2.y],
        ['Z'],
      ];
      // pointer
      group.addShape('path', {
        name: 'pointer',
        attrs: {
          path,
          fill: defaultColor,
          lineCap: 'round',
          ...pointer.style,
        },
      });
      // pointer
      group.addShape('circle', {
        name: 'pointer-center',
        attrs: {
          x: center.x,
          y: center.y,
          r: 2,
          fill: '#fff',
        },
      });
    }

    return group;
  },
});

const gauge = new Gauge('container', {
  percent: 0.75,
  range: {
    ticks: [0, 1 / 4, 1 / 2, 3 / 4, 1],
    color: ['#F4664A', '#FAAD14', '#30BF78', '#000'],
  },
  startAngle: -Math.PI,
  endAngle: 0,
  gaugeStyle: {
    // 因为圆角是借助重叠去实现的，所以建议填充色不要有透明度
    fillOpacity: 1,
    lineCap: 'round',
    stroke: '#fff',
    lineWidth: 4,
  },
  indicator: {
    shape: 'custom-gauge-indicator',
    pointer: {
      style: {
        stroke: '#30BF78',
        lineWidth: 1,
        fill: '#30BF78',
      },
    },
    pin: {
      style: {
        lineWidth: 2,
        stroke: '#D0D0D0',
        fill: '#D0D0D0',
      },
    },
  },
  // 为底部预留 annotation 的位置
  appendPadding: [0, 0, 80, 0],
  statistic: {
    content: {
      offsetY: 70,
      customHtml: () => {
        // 提示信息，可以考虑不在这里展示，用其它方案代替。
        // 否则，方案1: 考虑这里返回一个 div，然后用 createPortal 搞上去
        // 方案2: 监听事件，动态增加一个 tooltip 信息提示
        return `
          <div><span>安全</span>
            <span className="info-icon" data-info="安全指标" style="line-height:26px;"><img width="16" src="https://gw.alipayobjects.com/zos/antfincdn/wKEJBoEf4w/question-circle-o.png"></span>
          </div>
        `;
      },
      style: {
        fontSize: '24px',
        lineHeight: '26px',
      },
    },
  },
});

gauge.render();
