import { Box } from '../../../../src';
import { boxData } from '../../../data/box';
import { createDiv } from '../../../utils/dom';

describe('column style', () => {
  it('style config', () => {
    const column = new Box(createDiv('style config'), {
      width: 400,
      height: 500,
      data: boxData,
      xField: 'x',
      yField: ['low', 'q1', 'median', 'q3', 'high'],
      meta: {
        sales: {
          nice: true,
          formatter: (v) => `${Math.floor(v / 10000)}万`,
        },
      },
      boxStyle: {
        stroke: 'black',
        lineWidth: 2,
        fill: '#1890FF',
      },
    });

    column.render();

    const geometry = column.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('stroke')).toBe('black');
    expect(elements[0].shape.attr('lineWidth')).toBe(2);
    expect(elements[0].shape.attr('fill')).toBe('#1890FF');
  });

  // TODO
  // it('style callback', () => {});
});
