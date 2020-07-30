import { Area } from '../../../../src';
import { partySupport } from '../../../data/party-support';
import { createDiv } from '../../../utils/dom';

describe('area', () => {
  it('x*y and tooltip', () => {
    const area = new Area(createDiv(), {
      width: 400,
      height: 300,
      data: partySupport.filter((o) => ['FF'].includes(o.type)),
      xField: 'date',
      yField: 'value',
      appendPadding: 10,
      tooltip: {
        title: 'hello wold',
      },
    });

    area.render();
    // @ts-ignore
    expect(area.chart.options.tooltip.title).toBe('hello wold');

    area.update({
      ...area.options,
      tooltip: false,
    });
    // @ts-ignore
    expect(area.chart.options.tooltip).toBe(false);
    expect(area.chart.getComponents().find((co) => co.type === 'tooltip')).toBe(undefined);
  });

  it('x*y*color and toolip', () => {
    const area = new Area(createDiv(), {
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

    area.render();
    // @ts-ignore
    expect(area.chart.options.tooltip.shared).toBe(true);
    // @ts-ignore
    expect(area.chart.options.tooltip.showCrosshairs).toBe(true);
  });
});
