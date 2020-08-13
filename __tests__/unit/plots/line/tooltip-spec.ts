import { Line } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('line', () => {
  it('x*y and tooltip', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      appendPadding: 10,
      tooltip: {
        title: 'hello world',
      },
    });

    line.render();
    // @ts-ignore
    expect(line.chart.options.tooltip.title).toBe('hello world');

    line.update({
      ...line.options,
      tooltip: false,
    });
    // @ts-ignore
    expect(line.chart.options.tooltip).toBe(false);
    expect(line.chart.getComponents().find((co) => co.type === 'tooltip')).toBe(undefined);
  });

  it('x*y*color and toolip', () => {
    const line = new Line(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF', 'Lab'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      appendPadding: 10,
      tooltip: {
        shared: true,
        showCrosshairs: true,
      },
    });

    line.render();
    // @ts-ignore
    expect(line.chart.options.tooltip.shared).toBe(true);
    // @ts-ignore
    expect(line.chart.options.tooltip.showCrosshairs).toBe(true);
  });
});
