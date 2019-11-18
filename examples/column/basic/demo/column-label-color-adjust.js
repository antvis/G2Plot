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
    text: '基础柱状图label颜色自动调整',
  },
  description: {
    visible: true,
    text:
      '图形标签(label)的adjustColor配置项设置为true时，位于柱形的内部的label颜色会根据柱形颜色自动调整，保证可读性。',
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
  colorField: 'type',
  color: ['#55A6F3', '#55A6F3', '#55A6F3', '#CED4DE', '#55A6F3', '#55A6F3', '#55A6F3', '#55A6F3'],
  label: {
    visible: true,
    position: 'middle',
    adjustColor: true,
  },
});

columnPlot.render();
