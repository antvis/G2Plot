import { get } from '@antv/util';
import { Line } from '../../src';
import { createDiv } from '../utils/dom';

describe('#3804', () => {
  it('line label style with callback', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      autoFit: false,
      data: [
        { year: '1991', value: 3 },
        { year: '1992', value: 4 },
        { year: '1993', value: 3.5 },
        { year: '1994', value: 5 },
        { year: '1995', value: 4.9 },
        { year: '1996', value: 6 },
        { year: '1997', value: 7 },
        { year: '1998', value: 9 },
        { year: '1999', value: 13 },
      ],
      xField: 'year',
      yField: 'value',
      label: {
        fields: ['year', 'value'],
        callback: (year, value) => {
          return {
            style: {
              text: value,
              fill: value > 10 ? '#f24' : '#000',
            },
          };
        },
      },
    });
    line.render();
    const geometry = line.chart.geometries[0];
    expect(get(geometry, ['labelOption', 'fields'])).toEqual(['year', 'value']);
    line.destroy();
  });
});
