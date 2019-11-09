import { Pie } from '@antv/g2plot';

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

const piePlot = new Pie(document.getElementById('container'), {
  forceFit: true,
  title: {
    visible: true,
    text: '单色饼图',
  },
  description: {
    visible: true,
    text: '不指定colorField(颜色映射字段)，或color颜色设为单值时，饼图所有切片显示为一种颜色。',
  },
  radius: 0.8,
  padding: 'auto',
  data,
  angleField: 'value',
  // color: '#FDAD9F'
});

piePlot.render();
