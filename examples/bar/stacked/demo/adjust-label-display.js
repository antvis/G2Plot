import { StackedBar } from '@antv/g2plot';

const data_old = [
  {
    year: '1991',
    value: 3,
    type: 'Lon',
  },
  {
    year: '1992',
    value: 4,
    type: 'Lon',
  },
  {
    year: '1993',
    value: 3.5,
    type: 'Lon',
  },
  {
    year: '1994',
    value: 0.5,
    type: 'Lon',
  },
  {
    year: '1995',
    value: 4.9,
    type: 'Lon',
  },
  {
    year: '1996',
    value: 6,
    type: 'Lon',
  },
  {
    year: '1997',
    value: 7,
    type: 'Lon',
  },
  {
    year: '1998',
    value: 9,
    type: 'Lon',
  },
  {
    year: '1999',
    value: 13,
    type: 'Lon',
  },
  {
    year: '1991',
    value: 0.3,
    type: 'Bor',
  },
  {
    year: '1992',
    value: 4,
    type: 'Bor',
  },
  {
    year: '1993',
    value: 3.5,
    type: 'Bor',
  },
  {
    year: '1994',
    value: 5,
    type: 'Bor',
  },
  {
    year: '1995',
    value: 4.9,
    type: 'Bor',
  },
  {
    year: '1996',
    value: 6,
    type: 'Bor',
  },
  {
    year: '1997',
    value: 7,
    type: 'Bor',
  },
  {
    year: '1998',
    value: 9,
    type: 'Bor',
  },
  {
    year: '1999',
    value: 13,
    type: 'Bor',
  },
];

const data = [
  {
    地区: '华东',
    细分: '公司',
    销售额: 1454715.807999998,
  },
  {
    地区: '华东',
    细分: '消费者',
    销售额: 2287358.261999998,
  },
  {
    地区: '华东',
    细分: '小型企业',
    销售额: 942432.3720000006,
  },
  {
    地区: '中南',
    细分: '公司',
    销售额: 1335665.3239999984,
  },
  {
    地区: '中南',
    细分: '消费者',
    销售额: 2057936.7620000008,
  },
  {
    地区: '中南',
    细分: '小型企业',
    销售额: 743813.0069999992,
  },
  {
    地区: '东北',
    细分: '公司',
    销售额: 834842.827,
  },
  {
    地区: '东北',
    细分: '消费者',
    销售额: 1323985.6069999991,
  },
  {
    地区: '东北',
    细分: '小型企业',
    销售额: 522739.0349999995,
  },
  {
    地区: '华北',
    细分: '公司',
    销售额: 804769.4689999995,
  },
  {
    地区: '华北',
    细分: '消费者',
    销售额: 1220430.5610000012,
  },
  {
    地区: '华北',
    细分: '小型企业',
    销售额: 422100.9870000001,
  },
  {
    地区: '西南',
    细分: '公司',
    销售额: 469341.684,
  },
  {
    地区: '西南',
    细分: '消费者',
    销售额: 677302.8919999995,
  },
  {
    地区: '西南',
    细分: '小型企业',
    销售额: 156479.9319999999,
  },
  {
    地区: '西北',
    细分: '公司',
    销售额: 253458.1840000001,
  },
  {
    地区: '西北',
    细分: '消费者',
    销售额: 458058.1039999998,
  },
  {
    地区: '西北',
    细分: '小型企业',
    销售额: 103523.308,
  },
];

const stackBarPlot = new StackedBar(document.getElementById('container'), {
  forceFit: true,
  title: {
    visible: true,
    text: '堆叠条形图：label自动隐藏',
  },
  description: {
    visible: true,
    text:
      '在堆叠条形图中，如果label的位置被设定为middle，即显示在条形中间。在对应形状大小不够摆放label的情况下，label会被自动隐藏。',
  },
  data,
  yField: '地区',
  xField: '销售额',
  stackField: '细分',
  label: {
    offset: 0,
    visible: true,
    position: 'middle',
    formatter: (v) => Math.round(v / 10000) + '万',
  },
});
stackBarPlot.render();
