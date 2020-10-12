import { Waterfall } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('waterfall style', () => {
  it('style config', () => {
    const waterfall = new Waterfall(createDiv(), {
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
      waterfallStyle: {
        stroke: 'black',
        lineWidth: 2,
      },
    });

    waterfall.render();

    const geometry = waterfall.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].getModel().style.stroke).toBe('black');
    expect(elements[0].getModel().style.lineWidth).toBe(2);
    // fixme
    // expect(elements[0].shape.attr('stroke')).toBe('black');
    // expect(elements[0].shape.attr('lineWidth')).toBe(2);
  });

  it('style callback', () => {
    const waterfall = new Waterfall(createDiv(), {
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
      waterfallStyle: () => {
        return {
          stroke: 'black',
          lineWidth: 2,
        };
      },
    });

    waterfall.render();

    const geometry = waterfall.chart.geometries[0];
    const elements = geometry.elements;
    expect(elements[0].getModel().style.stroke).toBe('black');
    expect(elements[0].getModel().style.lineWidth).toBe(2);
    // fixme
    // expect(elements[0].shape.attr('stroke')).toBe('black');
    // expect(elements[0].shape.attr('lineWidth')).toBe(2);
  });
});
