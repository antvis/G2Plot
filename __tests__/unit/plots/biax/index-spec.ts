import { Biax } from '../../../../src';
import { CountryEconomy } from '../../../data/country-economy';
import { createDiv } from '../../../utils/dom';

describe('Biax data', () => {
  it('data', () => {
    document.body.append('test Biax data');
    const yField = ['GDP', 'Population'];
    const biax = new Biax(createDiv(), {
      width: 400,
      height: 500,
      data: CountryEconomy,
      xField: 'Country',
      yField,
    });

    biax.render();

    const lineGeometrys = biax.chart.geometries.filter((g) => g.type === 'line');
    expect(lineGeometrys.length).toBe(2);

    lineGeometrys.forEach((geometry, index) => {
      // 数据
      expect(geometry.data.length).toBe(CountryEconomy.length);
      const lineData = CountryEconomy.map((item) => item[yField[index]]);
      expect(geometry.scales[yField[index]].max).toBe(Math.max(...lineData));
      expect(geometry.scales[yField[index]].min).toBe(Math.min(...lineData));
    });
  });
});
