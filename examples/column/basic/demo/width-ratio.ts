import { Column } from '@antv/g2plot';

const data = [
  {
    type: '湖州',
    sales: 38,
  },
  {
    type: '嘉兴',
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

const columnPlot = new Column('container', {
  data,
  xField: 'type',
  yField: 'sales',
  columnWidthRatio: 0.8,
  xAxis: {
    label: {
      autoHide: true,
      autoRotate: false,
    },
  },
  meta: {
    type: {
      alias: '类别',
    },
    sales: {
      alias: '销售额',
    },
  },
});

columnPlot.render();
