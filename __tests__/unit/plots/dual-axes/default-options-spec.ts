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

    expect(dualAxes.options.meta.date.sync).toBe(true);
    expect(dualAxes.options.meta.date.range).toEqual([0, 1]);
    // @ts-ignore
    expect(dualAxes.options.tooltip.showCrosshairs).toEqual(true);
    // @ts-ignore
    expect(dualAxes.options.tooltip.showMarkers).toEqual(true);
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

    expect(dualAxes.options.meta.date.sync).toBe(true);
    expect(dualAxes.options.meta.date.range).toEqual(undefined);
    // @ts-ignore
    expect(dualAxes.options.tooltip.showCrosshairs).toEqual(false);
    // @ts-ignore
    expect(dualAxes.options.tooltip.showMarkers).toEqual(false);

    expect(dualAxes.options.interactions.some((i) => i.type === 'active-region'));
  });
});
