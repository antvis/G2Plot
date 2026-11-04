/**
 * 基础两集合韦恩图
 * 场景：比较两个用户群体的规模与重叠人群
 * 要点：path mark + venn 数据转换；d/color 分别映射转换生成的 path/key
 */
import { Chart } from '@antv/g2';

const data = [
  { sets: ['内容推荐'], size: 1200, label: '内容推荐' },
  { sets: ['社交分享'], size: 800, label: '社交分享' },
  { sets: ['内容推荐', '社交分享'], size: 300, label: '双渠道用户' },
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
  encode: { d: 'path', color: 'key' },
  labels: [{ position: 'inside', text: 'label' }],
  style: {
    opacity: (d: { sets: string[] }) => (d.sets.length > 1 ? 0.45 : 0.75),
  },
});

chart.render();
