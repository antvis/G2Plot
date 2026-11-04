/**
 * 空心韦恩图
 * 场景：只需呈现集合边界与重叠关系，避免实心填充造成视觉遮挡
 * 要点：encode.shape 设为 hollow，并用 style.lineWidth 调整轮廓
 */
import { Chart } from '@antv/g2';

const data = [
  { sets: ['JavaScript'], size: 86, label: 'JavaScript' },
  { sets: ['TypeScript'], size: 64, label: 'TypeScript' },
  { sets: ['JavaScript', 'TypeScript'], size: 38, label: '两种语言' },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'path',
  data: {
    type: 'inline',
    value: data,
    transform: [{ type: 'venn' }],
  },
  encode: { d: 'path', color: 'key', shape: 'hollow' },
  labels: [{ position: 'inside', text: 'label' }],
  style: { lineWidth: 2 },
});

chart.render();
