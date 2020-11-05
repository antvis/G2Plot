import { Box } from '../../../../src';
import { boxData } from '../../../data/box';
import { createDiv } from '../../../utils/dom';

describe('box style', () => {
  it('style config', () => {
    const box = new Box(createDiv('style config'), {
      width: 400,
      height: 500,
      data: boxData,
      xField: 'x',
      yField: ['low', 'q1', 'median', 'q3', 'high'],
      boxStyle: {
        stroke: 'black',
        lineWidth: 2,
        fill: '#1890FF',
      },
    });

    box.render();

    const geometry = box.chart.geometries[0];
    const elements = geometry.elements;

    expect(elements[0].shape.attr('stroke')).toBe('black');
    expect(elements[0].shape.attr('lineWidth')).toBe(2);
    expect(elements[0].shape.attr('fill')).toBe('#1890FF');

    box.destroy();
  });

  it('style callback', () => {
    const box = new Box(createDiv('style config'), {
      width: 400,
      height: 500,
      data: boxData,
      xField: 'x',
      yField: ['low', 'q1', 'median', 'q3', 'high'],
      boxStyle: () => {
        return {
          stroke: 'black',
          lineWidth: 2,
          fill: '#1890FF',
        };
      },
    });

    box.render();

    const geometry = box.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('stroke')).toBe('black');
    expect(elements[0].shape.attr('fill')).toBe('#1890FF');

    box.destroy();
  });
});
