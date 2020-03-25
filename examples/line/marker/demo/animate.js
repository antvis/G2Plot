import { Line } from '@antv/g2plot';

const data = [
  { date: '2019-01-01', value: 3 },
  { date: '2019-02-01', value: 4 },
  { date: '2019-03-01', value: 3.5 },
  { date: '2019-04-01', value: 5 },
  { date: '2019-05-01', value: 4.9 },
  { date: '2019-06-01', value: 6 },
  { date: '2019-07-01', value: 7 },
  { date: '2019-08-01', value: 9 },
  { date: '2019-09-01', value: 3 },
  { date: '2019-10-01', value: 16 },
  { date: '2019-11-01', value: 6 },
  { date: '2019-12-01', value: 8 },
];

const maxValue = Math.max.apply(
  [],
  data.map((d) => d.value)
);

const linePlot = new Line(document.getElementById('container'), {
  title: {
    visible: true,
    text: '标注最大值（带动画）',
  },
  description: {
    visible: true,
    text: '可通过 animation 配置标注点的动画',
  },
  forceFit: true,
  padding: 'auto',
  data,
  xField: 'date',
  yField: 'value',
  yAxis: {
    nice: true,
  },
  label: {
    visible: false,
  },
  markerPoints: [
    {
      visible: true,
      data: [{ value: maxValue }],
      label: {
        visible: true,
        formatter: () => '最大值',
      },
      style: {
        normal: { fill: 'rgba(255, 0, 0, 0.65)' },
      },
      animation: {
        endState: { size: 4, opacity: 0.3 },
        animateCfg: {
          duration: 1500,
          easing: 'easeLinear',
          repeat: true,
          delay: 1200,
        },
      },
    },
  ],
});

linePlot.render();
