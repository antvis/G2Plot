import { Facet } from '@antv/g2plot';

const data = [
  { gender: '男', count: 40, class: '一班', grade: '一年级' },
  { gender: '女', count: 30, class: '一班', grade: '一年级' },
  { gender: '男', count: 35, class: '二班', grade: '一年级' },
  { gender: '女', count: 45, class: '二班', grade: '一年级' },
  { gender: '男', count: 20, class: '三班', grade: '一年级' },
  { gender: '女', count: 35, class: '三班', grade: '一年级' },
  { gender: '男', count: 30, class: '一班', grade: '二年级' },
  { gender: '女', count: 40, class: '一班', grade: '二年级' },
  { gender: '男', count: 25, class: '二班', grade: '二年级' },
  { gender: '女', count: 32, class: '二班', grade: '二年级' },
  { gender: '男', count: 28, class: '三班', grade: '二年级' },
  { gender: '女', count: 36, class: '三班', grade: '二年级' },
];

function getData(data)  {
  const getSum = (data) => data.reduce((r, d) => r + d.count, 0);
  const sum = getSum(data);
  const gender = ['男', '女'];
  return gender.map(g => {
    const item = { gender: g, count: getSum(data.filter(d => d.gender === g)) }
    return { ...item, percent: item.count / sum };
  });
}

const plot = new Facet('container', {
  appendPadding: [0, 16, 16, 16],
  data,
  type: 'tree',
  fields: ['grade', 'class'],
  // coordinate: { type: 'theta' },
  meta: {
    percent: {
      formatter(val) {
        return (val * 100).toFixed(2) + '%';
      },
    },
  },
  // tree-facet 连接线样式和是否平滑
  line: {
    style: {
      stroke: '#dedede',
    },
    smooth: true,
  },
  tooltip: { showMarkers: false },
  eachView: (view, facet) => {
      // 对角线的图形，做数据封箱之后绘制图形
    return {
      type: 'pie',
      options: {
        data: getData(facet.data),
        angleField: 'percent',
        colorField: 'gender',
        pieStyle: { opacity: 0.85 },
        // 添加动画
        animation: {},
        // 添加交互
        interactions: [{ type: 'element-active' }],
      },
    };
  },
});

plot.render();
