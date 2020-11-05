import { WordCloud } from '../../../../src';
import { CountryEconomy } from '../../../data/country-economy';
import { createDiv } from '../../../utils/dom';

describe('word-cloud', () => {
  it('label', () => {
    const cloud = new WordCloud(createDiv('x*y'), {
      width: 400,
      height: 300,
      data: CountryEconomy,
      wordField: 'Country',
      weightField: 'GDP',
    });

    cloud.render();

    const geometry = cloud.chart.geometries[0];
    const labelGroups = geometry.labelsContainer.getChildren();

    // 不显示 label 信息
    expect(labelGroups.length).toBe(0);

    cloud.destroy();
  });
});
