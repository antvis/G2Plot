import { BidirectionalBar } from '../../../../src';
import { data } from '../../../data/bi-directional';
import { createDiv } from '../../../utils/dom';

describe('bidirectional - G2内置interaction', () => {
  it('交互: active-region', () => {
    const bidirectionalBar = new BidirectionalBar(createDiv(), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: ['2016年耕地总面积', '2016年转基因种植面积'],
      interactions: [{ type: 'active-region' }],
    });
    bidirectionalBar.render();
    const leftView = bidirectionalBar.chart.views[0];
    const rightView = bidirectionalBar.chart.views[1];
    expect(leftView.interactions['active-region']).toBeDefined();
    expect(rightView.interactions['active-region']).toBeDefined();
    bidirectionalBar.destroy();
  });

  it('交互: element-highlight', () => {
    const bidirectionalBar = new BidirectionalBar(createDiv(), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: ['2016年耕地总面积', '2016年转基因种植面积'],
      interactions: [{ type: 'element-highlight' }],
    });

    bidirectionalBar.render();

    const leftView = bidirectionalBar.chart.views[0];
    const rightView = bidirectionalBar.chart.views[1];
    expect(leftView.interactions['element-highlight']).toBeDefined();
    expect(rightView.interactions['element-highlight']).toBeDefined();

    bidirectionalBar.destroy();
  });

  it('交互: element-active', () => {
    const bidirectionalBar = new BidirectionalBar(createDiv(), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: ['2016年耕地总面积', '2016年转基因种植面积'],
      interactions: [{ type: 'element-active' }],
    });

    bidirectionalBar.render();
    const leftView = bidirectionalBar.chart.views[0];
    const rightView = bidirectionalBar.chart.views[1];
    expect(leftView.interactions['element-active']).toBeDefined();
    expect(rightView.interactions['element-active']).toBeDefined();

    bidirectionalBar.destroy();
  });
});
