import { Area } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('area', () => {
  it('y min, max meta', () => {
    const area = new Area(createDiv(), {
      width: 400,
      height: 300,
      xField: 'date',
      yField: 'value',
      data: [
        { date: 'a', value: 10 },
        { date: 'b', value: 20 },
      ],
    });

    area.render();
    expect(area.chart.getScaleByField('value').min).toBe(0);
    expect(area.chart.getScaleByField('value').max).toBe(20);

    area.update({
      width: 400,
      height: 300,
      xField: 'date',
      yField: 'value',
      data: [
        { date: 'a', value: -10 },
        { date: 'b', value: -20 },
      ],
    });

    expect(area.chart.getScaleByField('value').min).toBe(-20);
    expect(area.chart.getScaleByField('value').max).toBe(0);

    area.destroy();
  });
});
