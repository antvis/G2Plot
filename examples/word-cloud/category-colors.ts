/**
 * 分类配色词云图
 * 场景：按产品体验维度组织手机评论关键词，同时用字号表达提及次数
 * 要点：color 映射分类字段，scale.color.range 指定分类色板并保留图例
 */
import { Chart } from '@antv/g2';

const data = [
  { keyword: '续航持久', aspect: '续航', mentionCount: 186 },
  { keyword: '充电迅速', aspect: '续航', mentionCount: 142 },
  { keyword: '屏幕细腻', aspect: '屏幕', mentionCount: 168 },
  { keyword: '高刷流畅', aspect: '屏幕', mentionCount: 126 },
  { keyword: '夜景清晰', aspect: '影像', mentionCount: 154 },
  { keyword: '人像自然', aspect: '影像', mentionCount: 108 },
  { keyword: '机身轻薄', aspect: '外观', mentionCount: 132 },
  { keyword: '配色耐看', aspect: '外观', mentionCount: 86 },
  { keyword: '信号稳定', aspect: '通信', mentionCount: 98 },
  { keyword: '通话清晰', aspect: '通信', mentionCount: 72 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'wordCloud',
  data,
  encode: {
    text: 'keyword',
    value: 'mentionCount',
    color: 'aspect',
  },
  scale: {
    color: {
      range: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#9270CA', '#6DC8EC'],
    },
  },
  layout: {
    fontSize: [16, 56],
    padding: 3,
    rotate: 0,
  },
  legend: { color: { position: 'top' } },
});

chart.render();
