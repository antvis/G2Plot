import { BidirectionalBar } from '@antv/g2plot';

export const data = [
  { country: '乌拉圭', '2016年耕地总面积': 13.4, '2016年转基因种植面积': 12.3 },
  { country: '巴拉圭', '2016年耕地总面积': 14.4, '2016年转基因种植面积': 6.3 },
  { country: '南非', '2016年耕地总面积': 18.4, '2016年转基因种植面积': 8.3 },
  { country: '巴基斯坦', '2016年耕地总面积': 34.4, '2016年转基因种植面积': 13.8 },
  { country: '阿根廷', '2016年耕地总面积': 44.4, '2016年转基因种植面积': 19.5 },
  { country: '巴西', '2016年耕地总面积': 24.4, '2016年转基因种植面积': 18.8 },
  { country: '加拿大', '2016年耕地总面积': 54.4, '2016年转基因种植面积': 24.7 },
  { country: '中国', '2016年耕地总面积': 104.4, '2016年转基因种植面积': 5.3 },
  { country: '美国', '2016年耕地总面积': 165.2, '2016年转基因种植面积': 72.9 },
];

const BidirectionalBarPlot = new BidirectionalBar('container', {
  data,
  layout: 'vertical',
  xField: 'country',
  yField: ['2016年耕地总面积', '2016年转基因种植面积'],
  tooltip: {
    shared: true,
    showMarkers: false,
  },
  appendPadding: [20, 0],
  // 开启 label 展示
  label: {
    // 默认居中, 'middle'
    position: 'top',
    // 默认为: 2
    // offset: 4,
  },
});

BidirectionalBarPlot.render();
