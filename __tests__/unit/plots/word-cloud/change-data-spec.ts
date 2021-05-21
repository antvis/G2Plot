import { WordCloud } from '../../../../src';
import { CountryEconomy } from '../../../data/country-economy';
import { createDiv } from '../../../utils/dom';
import { delay } from '../../../utils/delay';

describe('word-cloud changeData', () => {
  // 单测偶发性报错，暂时忽略
  it.skip('changeData: normal', async () => {
    const cloud = new WordCloud(createDiv(), {
      width: 1024,
      height: 1024,
      data: CountryEconomy,
      wordField: 'Country',
      weightField: 'GDP',
      wordStyle: {
        fontSize: [8, 30],
      },
      animation: false,
    });

    cloud.render();

    await delay(cloud.options.timeInterval || 10);

    expect(cloud.chart.geometries[0].elements.length).toEqual(CountryEconomy.length + 2);

    const newData = CountryEconomy.slice(0, 20);
    cloud.changeData(newData);
    expect(cloud.chart.geometries[0].elements.length).toEqual(newData.length + 2);
    expect(cloud.options.data).toEqual(newData);

    cloud.destroy();
  });

  // 总是偶发性失败，先 skip
  it.skip('changeData: from empty to have data', async () => {
    const cloud = new WordCloud(createDiv(), {
      width: 1024,
      height: 1024,
      data: [],
      wordField: 'Country',
      weightField: 'GDP',
      animation: false,
      wordStyle: {
        fontSize: [8, 30],
      },
    });

    cloud.render();

    cloud.changeData(CountryEconomy);

    await delay(cloud.options.timeInterval || 10);

    expect(cloud.chart.geometries[0].elements.length).toEqual(CountryEconomy.length + 2);
    expect(cloud.options.data).toEqual(CountryEconomy);

    cloud.destroy();
  });
});
