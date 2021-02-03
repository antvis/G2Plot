import { groupBy } from '@antv/util';
import { transformData } from '../../../../src/plots/bidirectional-bar/utils';
import { data } from '../../../data/bi-directional';

export const hopedata = [
  { country: '乌拉圭', type: '2016年耕地总面积', '2016年耕地总面积': 13.4 },
  { country: '巴拉圭', type: '2016年耕地总面积', '2016年耕地总面积': 14.4 },
  { country: '南非', type: '2016年耕地总面积', '2016年耕地总面积': 18.4 },
  { country: '巴基斯坦', type: '2016年耕地总面积', '2016年耕地总面积': 34.4 },
  { country: '阿根廷', type: '2016年耕地总面积', '2016年耕地总面积': 44.4 },
  { country: '巴西', type: '2016年耕地总面积', '2016年耕地总面积': 24.4 },
  { country: '加拿大', type: '2016年耕地总面积', '2016年耕地总面积': 54.4 },
  { country: '中国', type: '2016年耕地总面积', '2016年耕地总面积': 104.4 },
  { country: '美国', type: '2016年耕地总面积', '2016年耕地总面积': 165.2 },

  { country: '乌拉圭', type: '2016年转基因种植面积', '2016年转基因种植面积': 12.3 },
  { country: '巴拉圭', type: '2016年转基因种植面积', '2016年转基因种植面积': 6.3 },
  { country: '南非', type: '2016年转基因种植面积', '2016年转基因种植面积': 8.3 },
  { country: '巴基斯坦', type: '2016年转基因种植面积', '2016年转基因种植面积': 13.8 },
  { country: '阿根廷', type: '2016年转基因种植面积', '2016年转基因种植面积': 19.5 },
  { country: '巴西', type: '2016年转基因种植面积', '2016年转基因种植面积': 18.8 },
  { country: '加拿大', type: '2016年转基因种植面积', '2016年转基因种植面积': 24.7 },
  { country: '中国', type: '2016年转基因种植面积', '2016年转基因种植面积': 5.3 },
  { country: '美国', type: '2016年转基因种植面积', '2016年转基因种植面积': 72.9 },
];

describe('bullet*data*transfrom', () => {
  it('data*transfrom', () => {
    // 校验数据转换
    const transDS = transformData('country', ['2016年耕地总面积', '2016年转基因种植面积'], 'type', data);
    expect(transDS).toEqual(Object.values(groupBy(hopedata, 'type')));
  });

  it('data*transfrom: reverse', () => {
    // 校验数据转换
    const [data1, data2] = transformData('country', ['2016年耕地总面积', '2016年转基因种植面积'], 'type', data, true);
    expect(data1[0].country).toBe('美国');
    expect(data2[0].country).toBe('美国');
  });
});
