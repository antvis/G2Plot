/**
 * 基础词云图
 * 场景：概览电商站内搜索关键词的热度，突出高频搜索词
 * 要点：text/value 分别映射词语与数值权重，layout.fontSize 控制字号范围
 */
import { Chart } from '@antv/g2';

const data = [
  { keyword: '无线耳机', searchCount: 1280 },
  { keyword: '机械键盘', searchCount: 960 },
  { keyword: '人体工学椅', searchCount: 820 },
  { keyword: '降噪耳机', searchCount: 760 },
  { keyword: '显示器', searchCount: 680 },
  { keyword: '平板电脑', searchCount: 590 },
  { keyword: '智能手表', searchCount: 520 },
  { keyword: '移动电源', searchCount: 430 },
  { keyword: '蓝牙音箱', searchCount: 360 },
  { keyword: '笔记本电脑支架', searchCount: 280 },
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
    value: 'searchCount',
    color: 'keyword',
  },
  layout: {
    fontSize: [16, 64],
    padding: 2,
    rotate: 0,
  },
  legend: false,
});

chart.render();
