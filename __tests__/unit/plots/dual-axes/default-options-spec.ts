import { DualAxes } from '../../../../src';
import { PV_DATA, UV_DATA, UV_DATA_MULTI } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';
import { LEFT_AXES_VIEW, RIGHT_AXES_VIEW } from '../../../../src/plots/dual-axes/constant';
import { findViewById } from '../../../../src/utils/view';

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
    const leftView = findViewById(dualAxes.chart, LEFT_AXES_VIEW);
    const rightView = findViewById(dualAxes.chart, RIGHT_AXES_VIEW);
    // @ts-ignore
    expect(leftView.options.scales.date.type).toBeUndefined();
    // @ts-ignore
    expect(rightView.options.scales.date.type).toBeUndefined();
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
