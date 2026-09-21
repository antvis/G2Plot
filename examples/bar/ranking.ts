import { Chart } from '@antv/g2';

/**
 * 排名条形图
 * 场景：排行榜（Top N 城市/商品/门店），强调名次与数值
 * 要点：sortX 按 y 降序 + transpose；position 'inside' 标签放条体中间；
 *       text 回调自定义「名次 + 数值」内容，style.dx 微调水平偏移
 */
const data = [
  { city: '北京', gdp: 4.0 },
  { city: '上海', gdp: 4.3 },
  { city: '广州', gdp: 2.8 },
  { city: '深圳', gdp: 3.2 },
  { city: '杭州', gdp: 1.8 },
  { city: '成都', gdp: 2.0 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'interval',
  data,
  encode: { x: 'city', y: 'gdp' },
  transform: [{ type: 'sortX', by: 'y', reverse: true }],
  coordinate: { transform: [{ type: 'transpose' }] },
  labels: [
    {
      // 自定义标签内容：No.名次 + 数值
      text: (d: { gdp: number }, i: number) => `No.${i + 1}  ${d.gdp}`,
      position: 'inside', // 标签放条体中间
      style: { fontSize: 11, fill: '#fff', dx: 4 }, // dx 微调水平偏移
    },
  ],
  axis: { x: { title: 'GDP（万亿元）' } },
});

chart.render();
