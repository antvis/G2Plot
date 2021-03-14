import { Bar } from '@antv/g2plot';

const data = [
  { type: '家具家电', sales: 38 },
  { type: '粮油副食', sales: 52 },
  { type: '生鲜水果', sales: 61 },
  { type: '美容洗护', sales: 145 },
  { type: '母婴用品', sales: 48 },
  { type: '进口食品', sales: 38 },
  { type: '食品饮料', sales: 38 },
  { type: '家庭清洁', sales: 38 },
];

const bar = new Bar('container', {
  data,
  xField: 'sales',
  yField: 'type',
  legend: {
    position: 'top-left',
  },
  barBackground: {
    style: {
      fill: 'rgba(0,0,0,0.1)',
    },
  },
  interactions: [{ type: 'active-region', enable: false }],
});

bar.render();
