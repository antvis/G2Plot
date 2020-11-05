import { Rose } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('rose style', () => {
  it('style config', () => {
    const rose = new Rose(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
      meta: {
        sales: {
          nice: true,
          formatter: (v) => `${Math.floor(v / 10000)}万`,
        },
      },
      sectorStyle: {
        stroke: 'black',
        lineWidth: 2,
      },
    });

    rose.render();

    const geometry = rose.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('stroke')).toBe('black');
    expect(elements[0].shape.attr('lineWidth')).toBe(2);

    rose.destroy();
  });

  it('style callback', () => {
    const rose = new Rose(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
      meta: {
        sales: {
          nice: true,
          formatter: (v) => `${Math.floor(v / 10000)}万`,
        },
      },
      sectorStyle: () => {
        return {
          stroke: 'black',
          lineWidth: 2,
        };
      },
    });

    rose.render();

    const geometry = rose.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('stroke')).toBe('black');
    expect(elements[0].shape.attr('lineWidth')).toBe(2);

    rose.destroy();
  });
});
