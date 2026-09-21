import { Chart } from '@antv/g2';

/**
 * 渐变填充面积图
 * 场景：大屏/落地页等强调视觉质感的单系列趋势
 * 要点：style.fill 支持 CSS 线性渐变字符串，配合 fillOpacity 控制通透感
 */
const data = [
  { day: 'Mon', uv: 820 },
  { day: 'Tue', uv: 932 },
  { day: 'Wed', uv: 901 },
  { day: 'Thu', uv: 1290 },
  { day: 'Fri', uv: 1330 },
  { day: 'Sat', uv: 1120 },
  { day: 'Sun', uv: 980 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'area',
  data,
  encode: { x: 'day', y: 'uv', shape: 'smooth' },
  style: {
    fill: 'linear-gradient(180deg, #1890ff 0%, rgba(24,144,255,0.05) 100%)',
    fillOpacity: 0.9,
  },
  axis: { y: { title: 'UV' } },
});

chart.render();
