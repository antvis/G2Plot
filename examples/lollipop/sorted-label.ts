import { Chart } from '@antv/g2';

/**
 * 排序 + 数值标签的棒棒糖图
 * 场景：排行榜、Top N 对比，需要读者一眼看出排名与具体数值
 * 要点：排序在数据侧完成（先 sort 再画），不要依赖 x 轴刻度顺序；
 *       标签用 labels.text 指向数值字段，position 相对糖头定位；
 *       y 轴从 0 开始才能让茎的长度可直接比较
 */
const rawData = [
  { article: '如何用 G2 画出层级结构图', reads: 8420 },
  { article: 'G2 v5 迁移避坑指南', reads: 7150 },
  { article: '从零实现一个可视化看板', reads: 5630 },
  { article: '数据可视化的色彩选择', reads: 4180 },
  { article: '图表选型决策树详解', reads: 3090 },
  { article: 'AntV 生态年度盘点', reads: 1970 },
];

// 降序排列，排名即阅读顺序
const data = [...rawData].sort((a, b) => b.reads - a.reads).map((d) => ({ ...d, baseline: 0 }));

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'view',
  data,
  children: [
    {
      type: 'link',
      encode: { x: ['article', 'article'], y: ['baseline', 'reads'] },
      style: { stroke: '#9ecae1', lineWidth: 2 },
      tooltip: false,
    },
    {
      type: 'point',
      encode: { x: 'article', y: 'reads' },
      style: { r: 5, fill: '#5B8FF9', stroke: '#fff', lineWidth: 2 },
      // 糖头旁直接标数值，省去读者对比刻度
      labels: [
        {
          text: (d: { reads: number }) => `${(d.reads / 1000).toFixed(1)}k`,
          position: 'top',
          dy: -6,
          style: { fill: '#1d1d1d', fontSize: 11 },
        },
      ],
    },
  ],
  axis: {
    x: { title: '文章标题' },
    y: { title: '阅读量' },
  },
  tooltip: {
    title: 'article',
    items: [{ field: 'reads', name: '阅读量', valueFormatter: (v) => `${v} 次` }],
  },
});

chart.render();
