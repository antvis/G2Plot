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

const columnPlot = new Column('container', {
  data,
  xField: 'type',
  yField: 'sales',
  meta: {
    type: {
      alias: '类别',
    },
    sales: {
      alias: '销售额',
    },
  },
  annotations: [
    {
      type: 'region',
      start: (xScale: any) => {
        const ratio = xScale.ticks ? 1 / xScale.ticks.length : 1;
        const x = xScale.scale('美容洗护') - ratio / 2;
        return [`${x * 100}%`, '0%'];
      },
      end: (xScale: any) => {
        const ratio = xScale.ticks ? 1 / xScale.ticks.length : 1;
        const x = xScale.scale('美容洗护') + ratio / 2;
        return [`${x * 100}%`, '100%'];
      },
      style: {
        fill: 'rgb(255,0,0)',
      },
    },
    {
      type: 'text',
      position: ['美容洗护', 'max'],
      content: '最大销售量',
      style: {
        textAlign: 'center',
        textBaseline: 'top',
      },
    },
  ],
});

columnPlot.render();
