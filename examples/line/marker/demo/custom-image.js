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
  { date: '2019-09-01', value: 7 },
  { date: '2019-10-01', value: 13 },
  { date: '2019-11-01', value: 13 },
  { date: '2019-12-01', value: 13 },
];

const linePlot = new Line(document.getElementById('container'), {
  title: {
    visible: true,
    text: '使用 image 定义标注点',
  },
  description: {
    visible: true,
    text: '除了内置 symbol，还可以通过 "image://url" 设置为图片，其中 url 为图片的链接',
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
      data: [{ date: '2019-09-01' }],
      size: 20,
      symbol: 'image://https://gw.alipayobjects.com/mdn/rms_a30de3/afts/img/A*66RtR4cXNWoAAAAAAAAAAABkARQnAQ',
      label: {
        visible: true,
        position: 'bottom',
        offsetY: 8,
      },
      style: {
        // 关闭动态样式
        normal: { lineWidth: 0, fill: 'transparent' },
        active: { lineWidth: 0, fill: 'transparent' },
        selected: { lineWidth: 0, fill: 'transparent' },
      },
    },
  ],
});

linePlot.render();
