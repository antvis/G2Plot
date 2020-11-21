import { WordCloud } from '../../src';
import { CountryEconomy } from '../data/country-economy';
import { createDiv } from '../utils/dom';

describe('issue 1970', () => {
  it('bounds', () => {
    const cloud = new WordCloud(createDiv(), {
      width: 400,
      height: 300,
      data: CountryEconomy,
      wordField: 'Country',
      weightField: 'GDP',
    });

    cloud.render();

    const width = cloud.chart.ele.clientWidth;
    const height = cloud.chart.ele.clientHeight;

    // 最终的数据之中必须有这两个点表示画布的边界，才能正常渲染词云图
    // @ts-ignore
    expect(cloud.chart.filteredData.some((v) => v.x === 0 && v.y === 0)).toBe(true);
    // @ts-ignore
    expect(cloud.chart.filteredData.some((v) => v.x === width && v.y === height)).toBe(true);

    cloud.destroy();
  });
});
