import { Stock } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { kdata } from '../../../data/stock';

describe('Stock Legend', () => {
  it('default legend on', () => {
    const k = new Stock(createDiv('default legend on'), {
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
    });

    k.render();

    expect(k.chart.getComponents().filter((co) => co.type === 'legend').length).toBe(1);

    k.destroy();
  });

  it('legend position', () => {
    const k = new Stock(createDiv('legend position'), {
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
      legend: {
        position: 'right',
      },
    });

    k.render();

    const legend = k.chart.getComponents().filter((co) => co.type === 'legend')[0];
    expect(legend).toBeDefined();
    expect(legend.component.get('position')).toBe('right');

    k.destroy();
  });

  it('legend off', () => {
    const k = new Stock(createDiv('legend position'), {
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
      legend: false,
    });

    k.render();

    const legend = k.chart.getComponents().filter((co) => co.type === 'legend')[0];
    expect(legend).toBeUndefined();

    k.destroy();
  });
});
