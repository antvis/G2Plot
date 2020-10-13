import { DualAxes } from '../../../../src';
import { PV_DATA, UV_DATA_MULTI } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';

describe('stack', () => {
  it('stack line/column', () => {
    const dualAxes = new DualAxes(createDiv('test DualAxes doubal line'), {
      width: 400,
      height: 500,
      data: [UV_DATA_MULTI, UV_DATA_MULTI],
      xField: 'date',
      yField: ['pv', 'uv'],
      geometryOptions: [
        {
          geometry: 'column',
          seriesField: 'site',
          isStack: true,
        },
        {
          geometry: 'line',
          seriesField: 'site',
          isStack: true,
          point: {},
        },
      ],
    });

    dualAxes.render();

    expect(dualAxes.chart.views[0].geometries[0].type).toBe('interval');
    expect(dualAxes.chart.views[0].geometries[0].getAdjust('stack')).toBeDefined();

    expect(dualAxes.chart.views[1].geometries[0].type).toBe('line');
    expect(dualAxes.chart.views[1].geometries[1].type).toBe('point');
    expect(dualAxes.chart.views[1].geometries[0].getAdjust('stack')).toBeDefined();
    expect(dualAxes.chart.views[1].geometries[1].getAdjust('stack')).toBeDefined();
  });
});
