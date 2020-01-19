import { Rose } from '@antv/g2plot';

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

const rosePlot = new Rose(document.getElementById('container'), {
  forceFit: true,
  title: {
    visible: true,
    text: '带指标卡 玫瑰图(响应指标卡 click 交互)',
  },
  description: {
    visible: true,
    text: '带指标卡玫瑰图能够代替tooltip，单击时在中心挖空部分显示各分类的详细信息，双击时还原',
  },
  radius: 0.8,
  innerRadius: 0.6,
  data,
  radiusField: 'value',
  categoryField: 'type',
  colorField: 'type',
  label: {
    visible: true,
    type: 'outer',
    formatter: (text) => text,
  },
  statistic: {
    visible: true,
    triggerOn: 'click',
  },
});

rosePlot.render();
