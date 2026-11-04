import { Chart } from '@antv/g2';

/**
 * 多层级能源流向桑基图
 * 场景：一次能源经过发电、交通等中间环节，最终流向终端消费的多级流转
 * 要点：显式声明 nodes 固定节点顺序与轨道；layout 调整节点宽度、间距和迭代次数；
 *       节点颜色按 key 自动映射，链接保持低透明度以突出流向
 */
const links = [
  { source: '煤炭', target: '发电', value: 280 },
  { source: '煤炭', target: '工业', value: 120 },
  { source: '石油', target: '交通', value: 200 },
  { source: '石油', target: '化工', value: 60 },
  { source: '天然气', target: '发电', value: 150 },
  { source: '天然气', target: '供暖', value: 90 },
  { source: '发电', target: '工业', value: 250 },
  { source: '发电', target: '居民', value: 180 },
  { source: '交通', target: '公路', value: 140 },
  { source: '交通', target: '航空', value: 60 },
  { source: '工业', target: '终端消费', value: 370 },
  { source: '居民', target: '终端消费', value: 180 },
  { source: '供暖', target: '终端消费', value: 90 },
  { source: '公路', target: '终端消费', value: 140 },
  { source: '航空', target: '终端消费', value: 60 },
  { source: '化工', target: '终端消费', value: 60 },
];

const nodes = [
  { key: '煤炭' },
  { key: '石油' },
  { key: '天然气' },
  { key: '发电' },
  { key: '交通' },
  { key: '工业' },
  { key: '供暖' },
  { key: '化工' },
  { key: '居民' },
  { key: '公路' },
  { key: '航空' },
  { key: '终端消费' },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'sankey',
  data: { value: { links, nodes } },
  layout: {
    nodeAlign: 'justify',
    nodeWidth: 0.02,
    nodePadding: 0.02,
    iterations: 10,
  },
  scale: {
    color: {
      range: ['#5B8FF9', '#61DDAA', '#65789B', '#F6BD16', '#7262FD', '#78D3F8'],
    },
  },
  style: {
    labelSpacing: 5,
    labelFontSize: 11,
    nodeLineWidth: 1,
    nodeStroke: '#ffffff',
    linkFill: '#9fb3c8',
    linkFillOpacity: 0.35,
  },
  legend: false,
});

chart.render();
