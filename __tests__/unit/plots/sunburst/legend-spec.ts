import { Sunburst } from '../../../../src';
import { SUNBRUST_DATA } from '../../../data/sunburst';
import { createDiv } from '../../../utils/dom';

describe('plot legend', () => {
  const div = createDiv();
  const plot = new Sunburst(div, {
    data: SUNBRUST_DATA,
    colorField: 'label',
  });
  plot.render();

  it('legend: default is false', () => {
    expect(plot.chart.getOptions().legends).toEqual(false);
    expect(plot.chart.getComponents().filter((co) => co.type === 'legend').length).toBe(0);
  });

  it('legend config', () => {
    plot.update({
      legend: {
        position: 'top-left',
      },
    });
    // @ts-ignore
    expect(plot.chart.getOptions().legends.label).toEqual({ position: 'top-left' });
    expect(plot.chart.getComponents().filter((co) => co.type === 'legend').length).toBe(1);

    plot.update({
      ...plot.options,
      legend: {
        flipPage: true,
      },
    });

    // @ts-ignore
    expect(plot.chart.getOptions().legends.label).toEqual({
      position: 'top-left',
      flipPage: true,
    });
    expect(plot.chart.getComponents().filter((co) => co.type === 'legend').length).toBe(1);
  });

  afterAll(() => {
    plot.destroy();
  });
});
