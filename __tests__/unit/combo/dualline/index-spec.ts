import { DualLine } from '../../../../src';
import { CountryEconomy } from '../../../data/country-economy';
import { createDiv } from '../../../utils/dom';

describe('dualline data', () => {
  it('data', () => {
    document.body.append('test dualline data');

    const yField = ['GDP', 'Population'];
    const dualline = new DualLine(createDiv(), {
      width: 400,
      height: 500,
      data: CountryEconomy,
      xField: 'Country',
      yField,
    });

    dualline.render();

    const lineGeometrys = dualline.chart.geometries.filter((g) => g.type === 'line');
    expect(lineGeometrys.length).toBe(2);

    lineGeometrys.forEach((geometry, index) => {
      // 数据
      expect(geometry.data.length).toBe(CountryEconomy.length);
      const lineData = CountryEconomy.map((item) => item[yField[index]]);
      expect(geometry.scales[yField[index]].max).toBe(Math.max(...lineData));
      expect(geometry.scales[yField[index]].min).toBe(Math.min(...lineData));
    });

    // dualline.destroy();
  });
});
