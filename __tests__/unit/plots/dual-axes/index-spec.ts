import { DualAxes, Plot } from '../../../../src';
import { PV_DATA, UV_DATA } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';

describe('DualAxes data', () => {
  it('data', () => {
    const yField = ['pv', 'uv'];
    const dualAxes = new DualAxes(createDiv(), {
      width: 400,
      height: 500,
      data: [PV_DATA, UV_DATA],
      xField: 'date',
      yField,
    });

    dualAxes.render();
    expect(dualAxes instanceof Plot).toBe(true);
    expect(dualAxes.type).toBe('dual-axes');
    const leftLine = dualAxes.chart.views[0].geometries[0];
    const rightLine = dualAxes.chart.views[1].geometries[0];

    expect(leftLine.data.length).toBe(PV_DATA.length);
    expect(rightLine.data.length).toBe(UV_DATA.length);

    const pvData = PV_DATA.map((item) => item.pv);

    expect(Math.max(...leftLine.scales[yField[0]].values)).toBe(Math.max(...pvData));

    expect(Math.min(...leftLine.scales[yField[0]].values)).toBe(Math.min(...pvData));

    const uvData = UV_DATA.map((item) => item.uv);
    expect(Math.max(...rightLine.scales[yField[1]].values)).toBe(Math.max(...uvData));
    expect(Math.min(...rightLine.scales[yField[1]].values)).toBe(Math.min(...uvData));

    dualAxes.destroy();
  });
});
