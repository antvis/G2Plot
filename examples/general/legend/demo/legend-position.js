import { StackColumn } from '@antv/g2plot';

const data = [
  {
    time: '16 Q1',
    type: '移动游戏',
    value: 0,
  },
  {
    time: '16 Q1',
    type: '移动购物',
    value: 17.8,
  },
  {
    time: '16 Q1',
    type: '移动营销',
    value: 69.4,
  },
  {
    time: '16 Q1',
    type: '共享单车',
    value: 12.8,
  },
  {
    time: '16 Q2',
    type: '移动游戏',
    value: 0,
  },
  {
    time: '16 Q2',
    type: '移动购物',
    value: 18.1,
  },
  {
    time: '16 Q2',
    type: '移动营销',
    value: 70.7,
  },
  {
    time: '16 Q2',
    type: '共享单车',
    value: 11.2,
  },
  {
    time: '16 Q3',
    type: '移动游戏',
    value: 0,
  },
  {
    time: '16 Q3',
    type: '移动购物',
    value: 20.8,
  },
  {
    time: '16 Q3',
    type: '移动营销',
    value: 67.4,
  },
  {
    time: '16 Q3',
    type: '共享单车',
    value: 11.8,
  },
  {
    time: '16 Q4',
    type: '移动游戏',
    value: 0.1,
  },
  {
    time: '16 Q4',
    type: '移动购物',
    value: 20.3,
  },
  {
    time: '16 Q4',
    type: '移动营销',
    value: 69.2,
  },
  {
    time: '16 Q4',
    type: '共享单车',
    value: 10.4,
  },
  {
    time: '17 Q1',
    type: '移动游戏',
    value: 0.4,
  },
  {
    time: '17 Q1',
    type: '移动购物',
    value: 17.3,
  },
  {
    time: '17 Q1',
    type: '移动营销',
    value: 68.3,
  },
  {
    time: '17 Q1',
    type: '共享单车',
    value: 14,
  },
  {
    time: '17 Q2',
    type: '移动游戏',
    value: 1.2,
  },
  {
    time: '17 Q2',
    type: '移动购物',
    value: 18.3,
  },
  {
    time: '17 Q2',
    type: '移动营销',
    value: 68.6,
  },
  {
    time: '17 Q2',
    type: '共享单车',
    value: 11.9,
  },
];

const columnPlot = new StackColumn(document.getElementById('container'), {
  title: {
    visible: true,
    text: '指定图例位置',
  },
  description: {
    visible: true,
    text:
      '图例位置支持12个方位，分别为 left-top,left-center,left-bottom,right-top,right-top,right-bottom,top-left,top-center,top-bottom,bottom-left,bottom-center,bottom-right。',
  },
  data,
  xField: 'time',
  yField: 'value',
  stackField: 'type',
  legend: {
    visible: true,
    position: 'right-center',
  },
});

columnPlot.render();
