import { Bullet } from '@antv/g2plot';

const bulletPlot = new Bullet(document.getElementById('container'), {
  data: [
    {
      title: '满意度',
      measures: [30, 40, 10, 20],
      targets: [90],
    },
  ],
  rangeMax: 100,
  title: {
    visible: true,
    text: '堆叠子弹图',
  },
  description: {
    visible: true,
    text:
      '设定子弹图的目标值(goal)和当前进度(value)，即可展示子弹图进度情况；若没有设置最大值(max)，则最大值等于目标值',
  },
  legend: {
    formatter: (text) => {
      if (text === '0') {
        return '第一季度';
      } else if (text === '1') {
        return '第二季度';
      } else if (text === '2') {
        return '第三季度';
      } else if (text === '3') {
        return '第四季度';
      }
    },
  },
  label: {
    offset: -6,
  },
});

bulletPlot.render();
