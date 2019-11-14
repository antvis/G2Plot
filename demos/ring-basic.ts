// 基础环图

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

const piePlot = new g2plot.Ring(document.getElementById('canvas'), {
  padding: 'auto',
  data,
  angleField: 'value',
  colorField: 'type',
});
piePlot.render();

// 作为模块 避免变量冲突
export {};
