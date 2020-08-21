import { Bullet } from '@antv/g2plot';

const bulletPlot = new Bullet(document.getElementById('container'), {
  data: [
    {
      title: '满意度',
      measures: [83],
      targets: [90],
    },
  ],
  rangeMax: 100,
  title: {
    visible: true,
    text: '基础子弹图',
  },
  description: {
    visible: true,
    text:
      '设定子弹图的目标值(goal)和当前进度(value)，即可展示子弹图进度情况；若没有设置最大值(max)，则最大值等于目标值',
  },
  legend: {
    position: 'bottom',
    offsetY: -20,
  },
});

bulletPlot.render();
