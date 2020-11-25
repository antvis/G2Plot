import { Bar } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('bar', () => {
  it('y min, max meta', () => {
    const plot = new Bar(createDiv(), {
      width: 400,
      height: 300,
      yField: 'date',
      xField: 'value',
      data: [
        { date: 'a', value: 10 },
        { date: 'b', value: 20 },
      ],
    });

    plot.render();
    expect(plot.chart.getScaleByField('value').min).toBe(0);
    expect(plot.chart.getScaleByField('value').max).toBe(20);

    plot.update({
      width: 400,
      height: 300,
      yField: 'date',
      xField: 'value',
      data: [
        { date: 'a', value: -10 },
        { date: 'b', value: -20 },
      ],
    });

    expect(plot.chart.getScaleByField('value').min).toBe(-20);
    expect(plot.chart.getScaleByField('value').max).toBe(0);

    plot.destroy();
  });
});
