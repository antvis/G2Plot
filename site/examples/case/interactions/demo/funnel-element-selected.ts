import { Funnel } from '@antv/g2plot';

const data = [
  { stage: '简历筛选', number: 253 },
  { stage: '初试人数', number: 151 },
  { stage: '复试人数', number: 113 },
  { stage: '录取人数', number: 87 },
  { stage: '入职人数', number: 59 },
];

const funnelPlot = new Funnel('container', {
  data: data,
  xField: 'stage',
  yField: 'number',
  legend: false,
  interactions: [{ type: 'element-active' }, { type: 'element-selected' }],
});

funnelPlot.render();
// 如果业务中还有单选联动，可以考虑使用按住某个键来区分交互 (或者多选之后，让用户自己去触发查询)
document.addEventListener('keyup', (evt) => {
  if (evt.key === 'Shift') {
    console.info(evt);
    const states = funnelPlot.getStates();
    console.info(states.filter((d) => d.state === 'selected'));
    // 获取选中元素
    // states.filter(d => d.state === 'selected')
  }
});
