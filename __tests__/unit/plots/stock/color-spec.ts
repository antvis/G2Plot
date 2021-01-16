import { Stock } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { kdata } from '../../../data/stock';

describe('Stock Color', () => {
  it('color option', () => {
    const k = new Stock(createDiv(), {
      width: 400,
      height: 500,
      data: kdata,
      xField: 'date',
      yField: ['start', 'end', 'max', 'min'],
      meta: {
        date: {
          mask: 'YYYY',
        },
      },
      color: ['yellow', 'blue', 'black'],
    });

    k.render();

    const geometry = k.chart.geometries[0];
    const elements = geometry.elements;

    // @ts-ignore
    expect(geometry.attributeOption.color.values.length).toBe(3);
    // @ts-ignore
    expect(geometry.attributeOption.color.values[0]).toBe('yellow');
    // @ts-ignore
    expect(elements[0].getModel().color).not.toBe('green');

    k.destroy();
  });


  it('trend field', () => {
    const k = new Stock(createDiv(), {
      width: 400,
      height: 500,
      data: kdata,
      xField: 'date',
      yField: ['start', 'end', 'max', 'min'],
      meta: {
        date: {
          mask: 'YYYY',
        },
      },
      color: ['yellow', 'blue', 'black'],
      trendField: 'trendField'
    });

    k.render();

    const geometry = k.chart.geometries[0];

    // @ts-ignore
    expect(geometry.attributeOption.color.fields).toContain('trendField');
    // @ts-ignore
    expect(geometry.scales.trendField.field).toBe('trendField');
    // @ts-ignore
    expect(geometry.scaleDefs['trendField'].values.length).toBe(3);

    k.destroy();
  });

  it('trend fn', () => {
    const k = new Stock(createDiv(), {
      width: 400,
      height: 500,
      data: kdata,
      xField: 'date',
      yField: ['start', 'end', 'max', 'min'],
      meta: {
        date: {
          mask: 'YYYY',
        },
      },
      color: ['yellow', 'blue', 'black'],
      trend: () => {
        return 'normal';
      }
    });

    k.render();

    const geometry = k.chart.geometries[0];
    const elements = geometry.elements;

    elements.forEach(item => {
      // @ts-ignore
      expect(item.getModel().color).toBe('black');
    })

    k.destroy();
  });



});
