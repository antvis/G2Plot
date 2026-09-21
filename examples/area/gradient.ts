import { Chart } from '@antv/g2';

/**
 * 渐变填充面积图
 * 场景：大屏/落地页等强调视觉质感的单系列趋势
 *
 * 要点（渐变方向，高频出错）：
 * - 单系列垂直渐变（上深下浅）在 style.fill 写 CSS 渐变字符串，角度必须是 180deg
 *   180deg = 从上到下（顶部实、底部透明），面积图的常规方向
 *   90deg  = 从左到右（方向错误）；0deg = 从下到上
 * - 不要用 gradient: true：那是按系列值着色的多段渐变（内部角度为 90deg），
 *   不是单系列垂直填充，会导致方向错乱
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
    // 180deg = 从上到下：顶部实色，底部渐隐
    fill: 'linear-gradient(180deg, #1890ff 0%, rgba(24,144,255,0.05) 100%)',
    fillOpacity: 0.9,
  },
  axis: { y: { title: 'UV' } },
});

chart.render();
