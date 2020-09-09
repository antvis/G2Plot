import { WordCloud } from '../../../../src';
import { CountryEconomy } from '../../../data/country-economy';
import { createDiv } from '../../../utils/dom';
import { DataItem } from '../../../../src/plots/word-cloud/types';

describe('word-cloud', () => {
  it('style', () => {
    const cloud = new WordCloud(createDiv('x*y'), {
      width: 400,
      height: 300,
      data: CountryEconomy,
      wordField: 'Country',
      weightField: 'GDP',
      wordStyle: {
        fontFamily: 'Impact',
        padding: 10,
        fontSize: [10, 100],
      },
    });

    cloud.render();

    const { data } = cloud.chart.getOptions();

    data.forEach((item: DataItem) => {
      // DataSet 处理之后会多出两个无用的数据
      if (!item.text) return;

      // 字体
      expect(item.font).toBe('Impact');
      expect(item.padding).toBe(10);
      // 字体大小
      expect(item.size >= 10 && item.size <= 100).toBe(true);
      // 旋转角度，默认配置
      expect(item.rotate === 0 || item.rotate === 90).toBe(true);
    });
  });
});
