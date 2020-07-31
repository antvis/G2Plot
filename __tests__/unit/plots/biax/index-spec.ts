import { Biax } from '../../../../src';
import { PV_DATA, UV_DATA } from '../../../data/pv-uv';
import { createDiv } from '../../../utils/dom';

describe('Biax data', () => {
  it('data', () => {
    document.body.append('test Biax data');
    const yField = ['pv', 'uv'];
    const biax = new Biax(createDiv(), {
      width: 400,
      height: 500,
      data: [PV_DATA, UV_DATA],
      xField: 'date',
      yField,
    });

    biax.render();

    const lineGeometrys = biax.chart.geometries.filter((g) => g.type === 'line');
    // expect(lineGeometrys.length).toBe(2);

    lineGeometrys.forEach((geometry, index) => {
      // 数据
      // expect(geometry.data.length).toBe(PV_DATA.length);
      // const lineData = PV_DATA.map((item) => item[yField[index]]);
      // expect(geometry.scales[yField[index]].max).toBe(Math.max(...lineData));
      // expect(geometry.scales[yField[index]].min).toBe(Math.min(...lineData));
    });
  });
});
