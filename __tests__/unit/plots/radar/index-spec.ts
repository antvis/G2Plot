import { Radar } from '../../../../src';
import { SERIES_DATA, SINGLE_DATA } from '../../../data/radar';
import { createDiv } from '../../../utils/dom';

describe('radar', () => {
  it('单组雷达图: xField*yField', () => {
    const radar = new Radar(createDiv(), {
      width: 400,
      height: 300,
      data: SINGLE_DATA,
      xField: 'name',
      yField: 'value',
      radius: 0.8,
    });

    radar.render();
    expect(radar.chart).toBeDefined();
    expect(radar.chart.geometries.length).toBe(1);
    expect(radar.chart.geometries[0].elements.length).toBe(1);

    radar.destroy();
  });

  it('多组雷达图: xField*yField*seriesField', () => {
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
      },
    });

    radar.render();
    expect(radar.chart).toBeDefined();
    expect(radar.chart.geometries.length).toBe(1);
    expect(radar.chart.geometries[0].elements.length).toBe(2);

    radar.destroy();
  });
});
