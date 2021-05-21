import { groupBy, keys } from '@antv/util';
import { WordCloud } from '../../../../src';
import { CountryEconomy } from '../../../data/country-economy';
import { createDiv } from '../../../utils/dom';
import { delay } from '../../../utils/delay';

describe('word-cloud', () => {
  it('legend', () => {
    const cloud = new WordCloud(createDiv('x*y'), {
      width: 400,
      height: 300,
      data: CountryEconomy,
      wordField: 'Country',
      weightField: 'GDP',
      colorField: 'continent',
    });

    cloud.render();

    const options = cloud.chart.getOptions();

    // 默认不显示 legend 信息
    expect(options.legends).toBe(false);

    cloud.destroy();
  });

  it('开启 legend', async () => {
    const cloud = new WordCloud(createDiv('x*y'), {
      width: 400,
      height: 300,
      data: CountryEconomy,
      wordField: 'Country',
      weightField: 'GDP',
      colorField: 'continent',
      legend: {},
      animation: false,
      wordStyle: {
        // 本地跑 live 也会丢失一个 series，故此加上 font-size
        fontSize: [12, 20],
      },
    });

    cloud.render();

    const options = cloud.chart.getOptions();
    await delay(cloud.options.timeInterval || 10);

    expect(options.legends).not.toBe(false);
    const legendController = cloud.chart.getController('legend');
    const legendComponent = legendController.getComponents()[0].component;
    expect(legendComponent.get('items').length).toBe(keys(groupBy(CountryEconomy, 'continent')).length);

    cloud.destroy();
  });
});
