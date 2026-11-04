/**
 * 三集合韦恩图
 * 场景：分析前端、后端、产品设计三类技能人员的两两及三者重叠
 * 要点：补齐单集合、两两交集和三集合交集；scale.color.range 自定义区域配色
 */
import { Chart } from '@antv/g2';

const data = [
  { sets: ['前端'], size: 42, label: '前端' },
  { sets: ['后端'], size: 48, label: '后端' },
  { sets: ['产品设计'], size: 30, label: '产品设计' },
  { sets: ['前端', '后端'], size: 16, label: '前端 ∩ 后端' },
  { sets: ['前端', '产品设计'], size: 12, label: '前端 ∩ 设计' },
  { sets: ['后端', '产品设计'], size: 9, label: '后端 ∩ 设计' },
  { sets: ['前端', '后端', '产品设计'], size: 5, label: '三者兼具' },
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
  scale: {
    color: {
      range: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#9270CA', '#FF9D4D', '#6DC8EC', '#E8684A'],
    },
  },
  labels: [{ position: 'inside', text: 'label' }],
});

chart.render();
