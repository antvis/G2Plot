import { Pie } from '../../src';
import { createDiv } from '../utils/dom';

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

describe('Pie', () => {
  it('title statistic using meta formatter', () => {
    const plot = new Pie(createDiv(), {
      data: [data, data],
      colorField: 'year',
      angleField: 'value',
      innerRadius: 0.4,
      statistic: { title: {} },
      meta: {
        year: {
          formatter: () => 'hello',
        },
      },
    });

    plot.render();

    const htmlAnnotations = document.querySelectorAll('.g2-html-annotation');
    expect((htmlAnnotations[0] as HTMLElement).innerText).toBe('hello');

    plot.destroy();
  });
});
