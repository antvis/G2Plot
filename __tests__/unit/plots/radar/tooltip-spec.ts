import { Radar } from '../../../../src';
import { SERIES_DATA } from '../../../data/radar';
import { createDiv } from '../../../utils/dom';

describe('radar tooltip', () => {
  it('shared', () => {
    const radar = new Radar(createDiv(), {
      width: 400,
      height: 300,
      data: SERIES_DATA,
      xField: 'name',
      yField: 'value',
      seriesField: 'type',
      radius: 0.8,
      tooltip: {
        shared: true,
        showCrosshairs: true,
      },
    });

    radar.render();
    // @ts-ignore
    expect(radar.chart.options.tooltip.shared).toBe(true);
    // @ts-ignore
    expect(radar.chart.options.tooltip.showCrosshairs).toBe(true);
  });
});
