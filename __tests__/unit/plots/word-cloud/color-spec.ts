import { WordCloud } from '../../../../src';
import { CountryEconomy } from '../../../data/country-economy';
import { createDiv } from '../../../utils/dom';

describe('word-cloud color option', () => {
  it('default', () => {
    const cloud = new WordCloud(createDiv(), {
      width: 400,
      height: 300,
      data: CountryEconomy,
      wordField: 'Country',
      weightField: 'GDP',
    });

    cloud.render();

    const fields = cloud.chart.geometries[0].getGroupFields();
    expect(fields.length).toBe(1);

    cloud.destroy();
  });

  it('wordField', () => {
    const cloud = new WordCloud(createDiv(), {
      width: 400,
      height: 300,
      data: CountryEconomy,
      wordField: 'Country',
      weightField: 'GDP',
      colorField: 'Country', // wordField 字段值
    });

    cloud.render();

    const field = cloud.chart.geometries[0].getGroupFields()[0];
    expect(field).toBe('color');

    cloud.destroy();
  });

  it('weightField', () => {
    const cloud = new WordCloud(createDiv(), {
      width: 400,
      height: 300,
      data: CountryEconomy,
      wordField: 'Country',
      weightField: 'GDP',
      colorField: 'GDP', // weightField 字段值
    });

    cloud.render();

    const field = cloud.chart.geometries[0].getGroupFields()[0];
    expect(field).toBe('color');

    cloud.destroy();
  });

  it('x', () => {
    const cloud = new WordCloud(createDiv(), {
      width: 400,
      height: 300,
      data: CountryEconomy,
      wordField: 'Country',
      weightField: 'GDP',
      colorField: 'x',
    });

    cloud.render();

    const field = cloud.chart.geometries[0].getGroupFields()[0];
    expect(field).toBe('color');

    cloud.destroy();
  });
});
