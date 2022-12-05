import { Pie } from '@antv/g2plot';

const data = [
  { type: '分类一', value: 27 },
  { type: '分类二', value: 25 },
  { type: '分类三', value: 18 },
  { type: '分类四', value: 15 },
  { type: '分类五', value: 10 },
  { type: '其他', value: 5 },
];

const piePlot = new Pie('container', {
  appendPadding: 10,
  data,
  angleField: 'value',
  colorField: 'type',
  radius: 0.9,
  label: {
    type: 'inner',
    offset: '-30%',
    content: ({ percent }) => `${(percent * 100).toFixed(0)}%`,
    style: {
      fontSize: 14,
      textAlign: 'center',
    },
  },
  interactions: [{ type: 'element-active' }, { type: 'element-selected' }],
});

piePlot.render();
// 如果业务中还有单选联动，可以考虑使用按住某个键来区分交互 (或者多选之后，让用户自己去触发查询)
document.addEventListener('keyup', (evt) => {
  if (evt.key === 'Shift') {
    console.info(evt);
    const states = piePlot.getStates();
    console.info(states.filter((d) => d.state === 'selected'));
    // 获取选中元素
    // states.filter(d => d.state === 'selected')
  }
});
