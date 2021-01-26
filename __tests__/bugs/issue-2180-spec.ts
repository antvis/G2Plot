import { transformData } from '../../src/plots/bidirectional-bar/utils';
import { BidirectionalBar } from '../../src';
import { createDiv } from '../utils/dom';

const data = [
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

describe('#2180', () => {
  it('横向基础水平方对称条形图设置title时左侧的title是反转的 ', () => {
    const bidirectional = new BidirectionalBar(createDiv('#2180'), {
      width: 400,
      height: 400,
      data,
      layout: 'horizontal',
      xField: 'country',
      yField: ['2016年耕地总面积', '2016年转基因种植面积'],
    });
    bidirectional.render();
    const firstView = bidirectional.chart.views[0];
    const elements = firstView.geometries[0].elements;
    const transDS = transformData('country', ['2016年耕地总面积', '2016年转基因种植面积'], 'type', data, true);
    // 横向反转了轴，elements 的索引从上至下，其实数据顺序并没有变化
    // @ts-ignore
    expect(transDS[0][0].country).toEqual(elements[0].data.country);
    bidirectional.destroy();
  });

  it('垂直', () => {
    const bidirectional = new BidirectionalBar(createDiv('#2180'), {
      width: 400,
      height: 400,
      data,
      layout: 'vertical',
      xField: 'country',
      yField: ['2016年耕地总面积', '2016年转基因种植面积'],
    });
    bidirectional.render();
    const firstView = bidirectional.chart.views[0];
    const elements = firstView.geometries[0].elements;
    const transDS = transformData('country', ['2016年耕地总面积', '2016年转基因种植面积'], 'type', data);
    // @ts-ignore 不需要反转
    expect(transDS[0][0].country).toEqual(elements[0].data.country);
    bidirectional.destroy();
  });
});
