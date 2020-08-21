import { Bullet } from '@antv/g2plot';

const bulletPlot = new Bullet(document.getElementById('container'), {
  data: [
    {
      title: '满意度',
      measures: [87],
      targets: [80, 95],
    },
  ],
  rangeMax: 100,
  markerColors: ['#5B8FF9', '#5AD8A6'],
  title: {
    visible: true,
    text: '基础子弹图-多目标值',
  },
  description: {
    visible: true,
    text:
      '设定子弹图的目标值(goal)和当前进度(value)，即可展示子弹图进度情况；若没有设置最大值(max)，则最大值等于目标值',
  },
  legend: {
    custom: true,
    position: 'bottom',
    offsetY: -5,
    items: [
      {
        name: '实际进度', // 图例项的文本内容
        marker: {
          symbol: 'square', // 该图例项 marker 的形状，参见 marker 参数的说明
          style: {
            fill: '#5B8FF9', // 该图例项 marker 的填充颜色
          },
        },
      },
      {
        name: '目标值 1', // 图例项的文本内容
        marker: {
          symbol: 'line', // 该图例项 marker 的形状，参见 marker 参数的说明
          style: {
            stroke: '#5B8FF9', // 该图例项 marker 的填充颜色
          },
        },
      },
      {
        name: '目标值 2', // 图例项的文本内容
        marker: {
          symbol: 'line', // 该图例项 marker 的形状，参见 marker 参数的说明
          style: {
            stroke: '#5AD8A6', // 该图例项 marker 的填充颜色
          },
        },
      },
    ],
  },
});

bulletPlot.render();
