import { DualAxes } from '../../src';
import { createDiv } from '../utils/dom';

describe('DualAxes: color callback will cause marker stroke error', () => {
  const data = [
    { year: '1991', value: 3, count: 10 },
    { year: '1992', value: 4, count: 4 },
    { year: '1993', value: 3.5, count: 5 },
    { year: '1994', value: 5, count: 5 },
    { year: '1995', value: 4.9, count: 4.9 },
    { year: '1996', value: 6, count: 35 },
    { year: '1997', value: 7, count: 7 },
    { year: '1998', value: 9, count: 1 },
    { year: '1999', value: 13, count: 20 },
  ];

  const plot = new DualAxes(createDiv(), {
    data: [data, data],
    xField: 'year',
    yField: ['value', 'count'],
    geometryOptions: [
      {
        geometry: 'line',
        color: 'green',
      },
      {
        geometry: 'line',
        color: () => 'red',
      },
    ],
  });

  plot.render();

  it('no seriesField', async () => {
    // @ts-ignore
    const markers = plot.chart
      .getController('legend')
      .components[0].component.get('container')
      .findAllByName('legend-item-marker');
    expect(markers[0].attr('stroke')).toBe('green');
    expect(markers[1].attr('stroke')).toBe('red');
  });

  afterAll(() => {
    plot.destroy();
  });
});
