import { Column } from '@antv/g2plot';

const data = [
  {
    type: '家具家电',
    sales: 38,
  },
  {
    type: '粮油副食',
    sales: 52,
  },
  {
    type: '生鲜水果',
    sales: 61,
  },
  {
    type: '美容洗护',
    sales: 145,
  },
  {
    type: '母婴用品',
    sales: 48,
  },
  {
    type: '进口食品',
    sales: 38,
  },
  {
    type: '食品饮料',
    sales: 38,
  },
  {
    type: '家庭清洁',
    sales: 38,
  },
];

const columnPlot = new Column(document.getElementById('container'), {
  title: {
    visible: true,
    text: '基础柱状图-图形标签',
  },
  description: {
    visible: true,
    text: '基础柱状图图形标签默认位置在柱形上部。',
  },
  forceFit: true,
  data,
  padding: 'auto',
  data,
  xField: 'type',
  yField: 'sales',
  meta: {
    type: {
      alias: '类别',
    },
    sales: {
      alias: '销售额(万)',
    },
  },
  label: {
    visible: true,
    style: {
      fill: '#0D0E68',
      fontSize: 12,
      fontWeight: 600,
      opacity: 0.6,
    },
  },
});

columnPlot.render();
