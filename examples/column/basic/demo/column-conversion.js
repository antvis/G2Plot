import { Column } from '@antv/g2plot';

const data = [
  { action: '浏览网站', pv: 50000 },
  { action: '放入购物车', pv: 35000 },
  { action: '生成订单', pv: 25000 },
  { action: '支付订单', pv: 15000 },
  { action: '完成交易', pv: 8500 },
];

const columnPlot = new Column(document.getElementById('container'), {
  title: {
    visible: true,
    text: '基础柱状图-转化率组件',
  },
  description: {
    visible: true,
    text: '基础柱状图的图形之间添加转化率标签图形，用户希望关注从左到右的数据变化比例',
  },
  forceFit: true,
  data,
  padding: 'auto',
  xField: 'action',
  yField: 'pv',
  conversionTag: {
    visible: true,
  },
});

columnPlot.render();
