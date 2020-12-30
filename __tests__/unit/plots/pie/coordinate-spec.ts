import { Pie } from '../../../../src';
import { POSITIVE_NEGATIVE_DATA } from '../../../data/common';
import { createDiv } from '../../../utils/dom';

describe('pie', () => {
  it('set startAngle & endAngle', () => {
    const pie = new Pie(createDiv(), {
      width: 400,
      height: 300,
      data: POSITIVE_NEGATIVE_DATA,
      angleField: 'value',
      colorField: 'type',
      radius: 0.8,
      startAngle: 0,
      endAngle: Math.PI,
    });

    pie.render();

    const coodinate = pie.chart.getCoordinate();
    expect(coodinate.startAngle).toBe(0);
    expect(coodinate.endAngle).toBe(Math.PI);

    pie.destroy();
  });
});
