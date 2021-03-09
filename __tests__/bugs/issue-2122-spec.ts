import { BidirectionalBar } from '../../src';
import { createDiv } from '../utils/dom';

describe('#2122', () => {
  it('数据为空', () => {
    const plot = new BidirectionalBar(createDiv(), {
      data: [],
      width: 400,
      height: 400,
      xField: 'country',
      xAxis: {
        position: 'bottom',
      },
      interactions: [{ type: 'active-region' }],
      yField: ['2016年耕地总面积', '2016年转基因种植面积'],
      tooltip: {
        shared: true,
        showMarkers: false,
      },
    });

    plot.render();

    expect(plot.chart).toBeDefined();
    plot.destroy();
  });
});
