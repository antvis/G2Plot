import { Bullet } from '@antv/g2plot';

const bulletPlot = new Bullet(document.getElementById('container'), {
  data: [
    {
      title: '广州',
      measures: [83],
      targets: [90],
    },
    {
      title: '深圳',
      measures: [13],
      targets: [90],
    },
    {
      title: '珠海',
      measures: [45],
      targets: [80],
    },
    {
      title: '汕头',
      measures: [83],
      targets: [70],
    },
  ],
  rangeMax: 100,

  title: {
    visible: true,
    text: '分组子弹图',
  },
  description: {
    visible: true,
    text: '当data数组由多个值时，可以展示多条子弹图进行进度对比',
  },
  legend: {
    position: 'bottom',
    offsetY: -5,
  },
});

bulletPlot.render();
