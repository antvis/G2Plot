import { Box } from '../../../../src';
import { boxData } from '../../../data/box';
import { createDiv } from '../../../utils/dom';

describe('box', () => {
  it('setState', () => {
    const plot = new Box(createDiv(), {
      width: 400,
      height: 500,
      data: boxData,
      xField: 'x',
      yField: ['low', 'q1', 'median', 'q3', 'high'],
      state: {
        active: {
          style: {
            stroke: 'yellow',
          },
        },
        selected: {
          style: {
            stroke: 'blue',
            fill: 'red',
          },
        },
      },
      animation: false,
    });

    plot.render();

    plot.setState('selected', (data) => {
      // @ts-ignore
      return data.x === 'Oceania';
    });

    expect(plot.getStates().length).toBe(1);

    const geometry = plot.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('stroke')).toBe('blue');
    expect(elements[0].shape.attr('fill')).toBe('red');

    plot.setState('active', (data) => {
      // @ts-ignore
      return data.x === 'Oceania';
    });

    expect(plot.getStates().length).toBe(2);
    expect(elements[0].shape.attr('stroke')).toBe('yellow');

    plot.destroy();
  });
});
