import { Rose } from '../../../../src';
import { salesByArea } from '../../../data/sales';
import { createDiv } from '../../../utils/dom';

describe('rose', () => {
  it('x*y and tooltip', () => {
    const rose = new Rose(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
      appendPadding: 10,
      tooltip: {
        title: 'hello world',
      },
    });

    rose.render();
    // @ts-ignore
    expect(rose.chart.options.tooltip.title).toBe('hello world');

    rose.update({
      ...rose.options,
      tooltip: false,
    });
    // @ts-ignore
    expect(rose.chart.options.tooltip).toBe(false);
    expect(rose.chart.getComponents().find((co) => co.type === 'tooltip')).toBe(undefined);
  });

  it('x*y*color and toolip', () => {
    const rose = new Rose(createDiv(), {
      width: 400,
      height: 300,
      data: salesByArea,
      xField: 'area',
      yField: 'sales',
      colorField: 'area',
      appendPadding: 10,
      tooltip: {
        shared: true,
        showCrosshairs: true,
      },
    });

    rose.render();
    // @ts-ignore
    expect(rose.chart.options.tooltip.shared).toBe(true);
    // @ts-ignore
    expect(rose.chart.options.tooltip.showCrosshairs).toBe(true);
  });
});
