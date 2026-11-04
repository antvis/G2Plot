/**
 * 横竖混排词云图
 * 场景：展示旅行内容平台的话题热度，用方向变化增强词云的视觉节奏
 * 要点：layout.rotate 按权重返回角度，spiral 使用矩形螺旋布局
 */
import { Chart } from '@antv/g2';

const data = [
  { topic: '城市漫步', heat: 96 },
  { topic: '周边游', heat: 88 },
  { topic: '亲子旅行', heat: 82 },
  { topic: '海岛度假', heat: 76 },
  { topic: '露营', heat: 70 },
  { topic: '博物馆', heat: 64 },
  { topic: '自驾游', heat: 58 },
  { topic: '美食探店', heat: 52 },
  { topic: '徒步路线', heat: 46 },
  { topic: '民宿', heat: 40 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'wordCloud',
  data,
  encode: {
    text: 'topic',
    value: 'heat',
    color: 'topic',
  },
  layout: {
    fontSize: [14, 58],
    padding: 3,
    spiral: 'rectangular',
    rotate: (word: { heat: number }) => (word.heat >= 70 ? 0 : 90),
  },
  legend: false,
});

chart.render();
