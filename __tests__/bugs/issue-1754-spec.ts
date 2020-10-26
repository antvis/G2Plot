import { WordCloud } from '../../src';
import { CountryEconomy } from '../data/country-economy';
import { createDiv } from '../utils/dom';

describe('issue 1754', () => {
  it('customContent', () => {
    const cloud = new WordCloud(createDiv(), {
      width: 400,
      height: 300,
      data: CountryEconomy,
      wordField: 'Country',
      weightField: 'GDP',
    });

    cloud.render();

    // @ts-ignore
    expect(cloud.chart.getOptions().tooltip.fields).toEqual(['text', 'value', 'color']);
  });
});
