import { WordCloud } from '../../../../src';
import { CountryEconomy } from '../../../data/country-economy';
import { createDiv } from '../../../utils/dom';

describe('word-cloud', () => {
  it('x*y and tooltip', () => {
    const cloud = new WordCloud(createDiv(), {
      width: 400,
      height: 300,
      data: CountryEconomy,
      wordField: 'Country',
      weightField: 'GDP',
      appendPadding: 10,
      tooltip: {
        showTitle: true,
        title: 'hello world',
      },
    });

    cloud.render();
    // @ts-ignore
    expect(cloud.chart.options.tooltip.title).toBe('hello world');

    cloud.update({
      ...cloud.options,
      tooltip: false,
    });
    // @ts-ignore
    expect(cloud.chart.options.tooltip).toBe(false);
    expect(cloud.chart.getComponents().find((co) => co.type === 'tooltip')).toBe(undefined);
  });
});
