import { Bullet } from '@antv/g2plot';

const bulletPlot = new Bullet(document.getElementById('container'), {
  title: {
    visible: true,
    text: '基础子弹图-带多颜色范围区间',
  },
  description: {
    visible: true,
    text: '自定义图例，表示各颜色范围区间代表的含义（如差、良、优）',
  },
  data: [
    {
      title: '满意度',
      measures: [83],
      targets: [90],
      ranges: [0, 0.6, 0.9, 1],
    },
  ],
  rangeMax: 100,
  rangeColors: ['#FFB1AC', '#FFDBA2', '#B4EBBF'],
  legend: {
    custom: true,
    position: 'bottom',
    offsetY: -20,
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
        name: '目标值', // 图例项的文本内容
        marker: {
          symbol: 'line', // 该图例项 marker 的形状，参见 marker 参数的说明
          style: {
            stroke: '#5B8FF9', // 该图例项 marker 的填充颜色
          },
        },
      },
      {
        name: '差', // 图例项的文本内容
        marker: {
          symbol: 'square', // 该图例项 marker 的形状，参见 marker 参数的说明
          style: {
            fill: '#FFB1AC', // 该图例项 marker 的填充颜色
          },
        },
      },
      {
        name: '良', // 图例项的文本内容
        marker: {
          symbol: 'square', // 该图例项 marker 的形状，参见 marker 参数的说明
          style: {
            fill: '#FFDBA2', // 该图例项 marker 的填充颜色
          },
        },
      },
      {
        name: '优', // 图例项的文本内容
        marker: {
          symbol: 'square', // 该图例项 marker 的形状，参见 marker 参数的说明
          style: {
            fill: '#B4EBBF', // 该图例项 marker 的填充颜色
          },
        },
      },
    ],
  },
});

bulletPlot.render();
