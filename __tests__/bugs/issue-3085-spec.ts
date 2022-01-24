import { Column } from '../../src';
import { createDiv } from '../utils/dom';

describe('#3085', () => {
  it('Column sum', () => {
    const data = [
      {
        country: 'Asia',
        year: '1750',
        value: 502,
      },
      {
        country: 'Ar',
        year: '1750',
        value: -502,
      },
    ];

    const column = new Column(createDiv(), {
      data,
      xField: 'year',
      yField: 'value',
      seriesField: 'country',
      isPercent: true,
      isStack: true,
    });

    column.render();
    column.update(column.options);

    expect(column.chart.getOptions().data).toEqual([
      {
        country: 'Asia',
        year: '1750',
        value: 0,
      },
      {
        country: 'Ar',
        year: '1750',
        value: 0,
      },
    ]);

    column.destroy();
  });
});
