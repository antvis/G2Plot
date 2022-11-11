import { deepMix } from '@antv/util';
import { WordCloud } from '../../../../src';
import { CountryEconomy } from '../../../data/country-economy';
import { delay } from '../../../utils/delay';
import { createDiv } from '../../../utils/dom';

describe('word-cloud', () => {
  const options = {
    width: 400,
    height: 300,
    data: CountryEconomy,
    wordField: 'Country',
    weightField: 'GDP',
  };

  it('basic', () => {
    const cloud = new WordCloud(createDiv(), options);
    cloud.render();

    // @ts-ignore
    expect(cloud.getDefaultOptions()).toBe(WordCloud.getDefaultOptions());

    const geometry = cloud.chart.geometries[0];
    const positionFields = geometry.getAttribute('position').getFields();

    // 类型
    expect(geometry.type).toBe('point');
    // x & y
    expect(positionFields).toHaveLength(2);
    // 数据经过 DataSet 处理过，这里是处理之后的数据中的 x 和 y 字段
    expect(positionFields[0]).toBe('x');
    expect(positionFields[1]).toBe('y');

    cloud.destroy();
  });

  it('imageMask', async () => {
    const o = deepMix({}, options, {
      imageMask: 'ssss', // 无效值
    });
    const cloud = new WordCloud(createDiv(), o);
    await cloud.render();
    expect(cloud.options.imageMask).toBe(null);
    cloud.destroy();
  });

  it('resize', async () => {
    const o = deepMix({}, options);
    const cloud = new WordCloud(createDiv(), o);
    const chart = cloud.chart;
    await cloud.render();
    expect(chart.width).toBe(400);

    chart.ele.style.width = `410px`;

    // @ts-ignore
    cloud.triggerResize();

    await delay(100);

    // expect(chart.width).toBe(410);
    cloud.destroy();
  });
});
