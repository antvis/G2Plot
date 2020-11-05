import { DualAxes } from '../../../../src';
import { PV_DATA, UV_DATA, UV_DATA_MULTI } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';

describe('default options', () => {
  it('dual line', () => {
    const dualAxes = new DualAxes(createDiv(), {
      height: 500,
      data: [PV_DATA, UV_DATA],
      xField: 'date',
      yField: ['pv', 'uv'],
    });

    dualAxes.render();
    // @ts-ignore
    expect(dualAxes.chart.getScaleByField('date').sync).toBeTruthy();
    expect(dualAxes.chart.getScaleByField('date').range).toEqual([0, 1]);
    // @ts-ignore
    expect(dualAxes.chart.options.tooltip.showCrosshairs).toEqual(true);
    // @ts-ignore
    expect(dualAxes.chart.options.tooltip.showMarkers).toEqual(true);

    dualAxes.destroy();
  });

  it('line column', () => {
    const dualAxes = new DualAxes(createDiv(), {
      height: 500,
      data: [PV_DATA, UV_DATA_MULTI],
      xField: 'date',
      yField: ['pv', 'uv'],
      geometryOptions: [
        {
          geometry: 'line',
        },
        {
          geometry: 'column',
          seriesField: 'site',
          isStack: true,
        },
      ],
    });

    dualAxes.render();
    // @ts-ignore
    expect(dualAxes.chart.getScaleByField('date').sync).toBeTruthy();
    expect(dualAxes.chart.getScaleByField('date').range.length).toBe(2);
    // @ts-ignore
    expect(dualAxes.chart.getOptions().tooltip.showCrosshairs).toEqual(false);
    // @ts-ignore
    expect(dualAxes.chart.getOptions().tooltip.showMarkers).toEqual(false);

    dualAxes.destroy();
  });
});
