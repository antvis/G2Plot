import { DualLine } from '../../../../src';
import { CountryEconomy } from '../../../data/country-economy';
import { createDiv } from '../../../utils/dom';

describe('dualline meta', () => {
  it('meta(include some axis attribute)', () => {
    document.body.append('meta(include some axis attribute)');
    const dualline = new DualLine(createDiv(), {
      width: 400,
      height: 500,
      data: CountryEconomy,
      xField: 'Country',
      yField: ['GDP', 'Population'],
      yAxis: [
        {
          min: 0,
          max: 50000,
          nice: false,
        },
        {
          tickCount: 5,
          nice: false,
        },
      ],
    });

    dualline.render();

    const yScales = dualline.chart.getYScales();
    expect(yScales[0].min).toBe(0);
    expect(yScales[0].max).toBe(50000);
    // @ts-ignore
    expect(yScales[0].nice).toBe(false);

    expect(yScales[1].tickCount).toBe(5);
    // @ts-ignore
    expect(yScales[1].nice).toBe(false);

    dualline.destroy();
  });
});
