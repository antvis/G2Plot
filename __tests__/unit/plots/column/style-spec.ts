import { Column } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('column style', () => {
  it('style config', () => {
    const column = new Column(createDiv(), {
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
      columnStyle: {
        stroke: 'black',
        lineWidth: 2,
      },
    });

    column.render();

    const geometry = column.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('stroke')).toBe('black');
    expect(elements[0].shape.attr('lineWidth')).toBe(2);
  });

  it('style callback', () => {
    const column = new Column(createDiv(), {
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
      columnStyle: (x, y) => {
        return {
          stroke: 'black',
          lineWidth: 2,
        };
      },
    });

    column.render();

    const geometry = column.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].shape.attr('stroke')).toBe('black');
    expect(elements[0].shape.attr('lineWidth')).toBe(2);
  });
});
