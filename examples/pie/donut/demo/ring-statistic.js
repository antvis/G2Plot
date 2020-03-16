import { Donut } from '@antv/g2plot';

const data = [
  {
    type: '分类一',
    value: 27,
  },
  {
    type: '分类二',
    value: 25,
  },
  {
    type: '分类三',
    value: 18,
  },
  {
    type: '分类四',
    value: 15,
  },
  {
    type: '分类五',
    value: 10,
  },
  {
    type: '其它',
    value: 5,
  },
];

const donutPlot = new Donut(document.getElementById('container'), {
  forceFit: true,
  title: {
    visible: true,
    text: '环图-指标卡',
  },
  description: {
    visible: true,
    text: '环图指标卡能够代替tooltip，在环图中心挖空部分显示各分类的详细信息。',
  },
  radius: 0.8,
  padding: 'auto',
  data,
  angleField: 'value',
  colorField: 'type',
  statistic: {
    visible: true,
  },
});

donutPlot.render();
