import { Chart } from '@antv/g2';

/**
 * 样式自定义：部门协作弦图
 * 场景：统计各团队之间的协作工单量，用颜色区分团队、弦带宽度表示协作强度
 * 要点：scale.color.range 自定义节点配色；layout 控制节点宽度、间距与排序；
 *       style 用 link* / label* 前缀分别定制弦带与节点标签
 */
const links = [
  { team: '前端', partner: '设计', tickets: 128 },
  { team: '前端', partner: '产品', tickets: 96 },
  { team: '前端', partner: '测试', tickets: 74 },
  { team: '后端', partner: '前端', tickets: 152 },
  { team: '后端', partner: '测试', tickets: 118 },
  { team: '后端', partner: '产品', tickets: 88 },
  { team: '设计', partner: '产品', tickets: 64 },
  { team: '测试', partner: '产品', tickets: 52 },
  { team: '测试', partner: '设计', tickets: 31 },
  { team: '产品', partner: '前端', tickets: 45 },
];

const chart = new Chart({
  container: 'container',
  autoFit: true,
});

chart.options({
  type: 'chord',
  data: { value: { links } },
  encode: { source: 'team', target: 'partner', value: 'tickets' },
  layout: {
    nodeWidthRatio: 0.06, // 节点弧宽度占画布比例
    nodePaddingRatio: 0.04, // 节点之间的留白比例
    sortBy: 'weight', // 按总流量从大到小排列节点
  },
  scale: {
    color: {
      type: 'ordinal',
      range: ['#5B8FF9', '#5AD8A6', '#F6BD16', '#E8684A', '#6DC8EC'],
    },
  },
  style: {
    linkFillOpacity: 0.45, // 降低弦带不透明度，减少互相遮挡
    linkStroke: '#ffffff', // 弦带描边帮助区分并列的弦
    labelFontSize: 12,
    labelFill: '#1d1d1d',
    labelFontWeight: 'bold',
  },
});

chart.render();
