import { Biax } from '../../../../src';
import { PV_DATA, UV_DATA } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';

describe('Biax data', () => {
  it('data', () => {
    const yField = ['pv', 'uv'];
    const biax = new Biax(createDiv(), {
      width: 400,
      height: 500,
      data: [PV_DATA, UV_DATA],
      xField: 'date',
      yField,
    });

    biax.render();
    const leftChart = biax.chart.views[0];
    const rightChart = biax.chart.views[1];

    expect(leftChart.geometries[0].data.length).toBe(PV_DATA.length);
    expect(rightChart.geometries[0].data.length).toBe(UV_DATA.length);

    const pvData = PV_DATA.map((item) => item.pv);

    expect(leftChart.geometries[0].scales[yField[0]].max).toBe(Math.max(...pvData));
    expect(leftChart.geometries[0].scales[yField[0]].min).toBe(Math.min(...pvData));

    const uvData = UV_DATA.map((item) => item.uv);
    expect(rightChart.geometries[0].scales[yField[1]].max).toBe(Math.max(...uvData));
    expect(rightChart.geometries[0].scales[yField[1]].min).toBe(Math.min(...uvData));
  });
});
