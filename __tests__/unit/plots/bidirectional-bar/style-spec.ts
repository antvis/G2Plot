import { BidirectionalBar } from '../../../../src';
import { data } from '../../../data/bi-directional';
import { createDiv } from '../../../utils/dom';

describe('Bidirectional style', () => {
  it('x*y*barStyle', () => {
    const bidirectional = new BidirectionalBar(createDiv(), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: 'value',
      seriesField: 'type',
      barStyle: {
        stroke: 'black',
        lineWidth: 2,
      },
    });
    bidirectional.render();

    const leftG = bidirectional.chart.views[0].geometries[0];
    const rightG = bidirectional.chart.views[1].geometries[0];

    expect(leftG.elements[0].shape.attr('stroke')).toBe('black');
    expect(leftG.elements[0].shape.attr('lineWidth')).toBe(2);
    expect(rightG.elements[0].shape.attr('stroke')).toBe('black');
    expect(rightG.elements[0].shape.attr('lineWidth')).toBe(2);
  });
  it('x*y*barStyle*callback', () => {
    const bidirectional = new BidirectionalBar(createDiv(), {
      width: 400,
      height: 400,
      data,
      xField: 'country',
      yField: 'value',
      seriesField: 'type',
      barStyle: () => {
        return {
          stroke: 'black',
          lineWidth: 2,
        };
      },
    });
    bidirectional.render();

    const leftG = bidirectional.chart.views[0].geometries[0];
    const rightG = bidirectional.chart.views[1].geometries[0];

    expect(leftG.elements[0].shape.attr('stroke')).toBe('black');
    expect(leftG.elements[0].shape.attr('lineWidth')).toBe(2);
    expect(rightG.elements[0].shape.attr('stroke')).toBe('black');
    expect(rightG.elements[0].shape.attr('lineWidth')).toBe(2);
  });
});
