import { Bar, G2 } from '@antv/g2plot';

const data = [
  { year: '1951 年', value: 38 },
  { year: '1952 年', value: 52 },
  { year: '1956 年', value: 61 },
  { year: '1957 年', value: 145 },
  { year: '1958 年', value: 48 },
];

// G2 自定义形状函数
G2.registerShape('interval', 'custom-shape', {
  draw(cfg, container) {
    const points = cfg.points;

    let path = [];
    const r = (points[2].x - points[1].x) / 2;

    // 开始点 注意 最标轴已经颠倒 x 代表了 y
    path.push(['M', points[3].x, points[3].y]);
    path.push(['L', points[2].x, points[2].y - r]);
    path.push(['A', r, r, 0, 0, 0, points[1].x, points[1].y - r]);
    path.push(['L', points[1].x, points[1].y - r]);
    path.push(['L', points[0].x, points[0].y]);
    // 回到开始点
    path.push('Z');
    path = this.parsePath(path);

    return container.addShape('path', {
      attrs: {
        // 颜色
        fill: cfg.color,
        // 画路径
        path,
      },
    });
  },
});

const bar = new Bar('container', {
  data,
  xField: 'value',
  yField: 'year',
  seriesField: 'year',
  legend: {
    position: 'top-left',
  },
  // 自定义 shape
  shape: 'custom-shape',
});

bar.render();
