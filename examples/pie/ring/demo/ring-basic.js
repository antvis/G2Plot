import { Ring } from '@antv/g2plot';

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
    type: 'Other',
    value: 5,
  },
];

const ringPlot = new Ring(document.getElementById('container'), {
  forceFit: true,
  title: {
    visible: true,
    text: '环形图',
  },
  radius: 0.8,
  padding: 'auto',
  data,
  angleField: 'value',
  colorField: 'type',
});

ringPlot.render();
