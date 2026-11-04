import { Chart } from '@antv/g2';

/**
 * 基础玉珏图（径向条形图）
 * 场景：对比各获客渠道的转化率，用同心圆弧长度表达数值大小
 * 要点：interval + radial 坐标系；y 轴固定 0~1 映射百分比；隐藏坐标轴，用图例标识类别
 */
const data = [
  { channel: '自然搜索', conversionRate: 0.42 },
  { channel: '社交推荐', conversionRate: 0.68 },
  { channel: '广告投放', conversionRate: 0.35 },
  { channel: '邮件营销', conversionRate: 0.24 },
  { channel: '直接访问', conversionRate: 0.55 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'channel', y: 'conversionRate', color: 'channel' },
  coordinate: { type: 'radial', innerRadius: 0.25 },
  scale: { y: { domain: [0, 1] } },
  axis: {
    x: { title: false, label: false, tick: false, line: false },
    y: { title: false, label: false, tick: false, line: false, grid: false },
  },
  legend: { color: { position: 'right' } },
  tooltip: {
    title: 'channel',
    items: [
      {
        channel: 'y',
        name: '转化率',
        valueFormatter: (v) => `${(Number(v) * 100).toFixed(1)}%`,
      },
    ],
  },
  style: { radius: 4 },
});

chart.render();
