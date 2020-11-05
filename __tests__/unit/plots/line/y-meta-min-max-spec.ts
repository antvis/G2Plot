import { Line } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('line', () => {
  it('y min, max meta', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      xField: 'date',
      yField: 'value',
      data: [
        { date: 'a', value: 10 },
        { date: 'b', value: 20 },
      ],
    });

    line.render();
    expect(line.chart.getScaleByField('value').min).toBe(0);
    expect(line.chart.getScaleByField('value').max).toBe(20);

    line.update({
      width: 400,
      height: 300,
      xField: 'date',
      yField: 'value',
      data: [
        { date: 'a', value: -10 },
        { date: 'b', value: -20 },
      ],
    });

    expect(line.chart.getScaleByField('value').min).toBe(-20);
    expect(line.chart.getScaleByField('value').max).toBe(0);

    line.destroy();
  });
});
