import { Chart } from '@antv/g2';

/**
 * 带数值标签的热力图
 * 场景：既要色阶直觉又要精确读数（如各地区各月达标率）
 * 要点：cell 标签默认即在格子中间；text 回调自定义内容（加百分号）；
 *       深色格子用白色文字保证对比度
 */
const data = [
  { region: '华东', month: 'Jan', rate: 82 },
  { region: '华东', month: 'Feb', rate: 91 },
  { region: '华东', month: 'Mar', rate: 76 },
  { region: '华南', month: 'Jan', rate: 68 },
  { region: '华南', month: 'Feb', rate: 74 },
  { region: '华南', month: 'Mar', rate: 88 },
  { region: '华北', month: 'Jan', rate: 95 },
  { region: '华北', month: 'Feb', rate: 61 },
  { region: '华北', month: 'Mar', rate: 79 },
  { region: '西南', month: 'Jan', rate: 55 },
  { region: '西南', month: 'Feb', rate: 70 },
  { region: '西南', month: 'Mar', rate: 83 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'cell',
  data,
  encode: { x: 'month', y: 'region', color: 'rate' },
  scale: { color: { type: 'sequential', palette: 'Blues' } },
  labels: [
    {
      // 自定义标签内容：数值 + 百分号；cell 标签默认居中
      text: (d: { rate: number }) => `占比：${d.rate}%`,
      style: {
        fontSize: 11,
        fill: (d: { rate: number }) => (d.rate > 80 ? '#fff' : '#333'),
        dy: 10,
      },
    },
  ],
  style: { inset: 2 },
});

chart.render();
