import { BidirectionalBar } from '../../../../src';
import { FIRST_AXES_VIEW, SECOND_AXES_VIEW } from '../../../../src/plots/bidirectional-bar/constant';
import { findViewById } from '../../../../src/utils/view';
import { createDiv } from '../../../utils/dom';

const data = [
  { country: '乌拉圭', '2016年耕地总面积': -13.4, '2016年转基因种植面积': -20.3 },
  { country: '巴拉圭', '2016年耕地总面积': 14.4, '2016年转基因种植面积': 6.3 },
  { country: '南非', '2016年耕地总面积': 18.4, '2016年转基因种植面积': 8.3 },
  { country: '巴基斯坦', '2016年耕地总面积': 34.4, '2016年转基因种植面积': 13.8 },
  { country: '阿根廷', '2016年耕地总面积': 44.4, '2016年转基因种植面积': 19.5 },
  { country: '巴西', '2016年耕地总面积': 24.4, '2016年转基因种植面积': 18.8 },
  { country: '加拿大', '2016年耕地总面积': 54.4, '2016年转基因种植面积': 24.7 },
  { country: '中国', '2016年耕地总面积': 104.4, '2016年转基因种植面积': 5.3 },
  { country: '美国', '2016年耕地总面积': 165.2, '2016年转基因种植面积': 72.9 },
];

let bidirectionalBar;

describe('BidirectionalBar: limitInPlot', () => {
  beforeAll(() => {
    bidirectionalBar = new BidirectionalBar(createDiv(), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: ['2016年耕地总面积', '2016年转基因种植面积'],
      layout: 'vertical',
    });

    bidirectionalBar.render();
  });

  it('default', () => {
    expect(findViewById(bidirectionalBar.chart, FIRST_AXES_VIEW).limitInPlot).toBeFalsy();
    expect(findViewById(bidirectionalBar.chart, SECOND_AXES_VIEW).limitInPlot).toBeFalsy();
  });

  it('default: yaxis min', () => {
    bidirectionalBar.update({
      yAxis: {
        '2016年转基因种植面积': {
          max: 50,
          min: -10,
        },
      },
    });
    expect(findViewById(bidirectionalBar.chart, FIRST_AXES_VIEW).limitInPlot).toBeFalsy();
    expect(findViewById(bidirectionalBar.chart, SECOND_AXES_VIEW).limitInPlot).toBeTruthy();
  });

  it('limitinplot: config false', () => {
    bidirectionalBar.update({
      limitInPlot: false,
      yAxis: {
        '2016年转基因种植面积': {
          max: 50,
          min: -10,
        },
      },
    });
    expect(findViewById(bidirectionalBar.chart, FIRST_AXES_VIEW).limitInPlot).toBeFalsy();
    expect(findViewById(bidirectionalBar.chart, SECOND_AXES_VIEW).limitInPlot).toBeFalsy();
  });

  it('limitinplot: config true', () => {
    bidirectionalBar.update({
      limitInPlot: true,
      yAxis: {},
    });
    expect(findViewById(bidirectionalBar.chart, FIRST_AXES_VIEW).limitInPlot).toBeTruthy();
    expect(findViewById(bidirectionalBar.chart, SECOND_AXES_VIEW).limitInPlot).toBeTruthy();
  });

  afterAll(() => {
    bidirectionalBar.destroy();
  });
});
