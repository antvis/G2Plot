import { TooltipCfg } from '@antv/g2/lib/interface';
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

    const data = [
      {
        data: { text: 'name', value: 'weight' },
        color: 'red',
      },
    ];
    const result =
      '<li class="g2-tooltip-list-item" style="margin-bottom:4px;display:flex;align-items:center;">' +
      '<span style="background-color:red;" class="g2-tooltip-marker"></span>' +
      '<span style="display:inline-flex;flex:1;justify-content:space-between">' +
      '<span style="margin-right: 16px;">name:</span><span>weight</span>' +
      '</span>' +
      '</li>';

    cloud.render();

    const customContent = (cloud.chart.getOptions().tooltip as TooltipCfg).customContent;
    expect(customContent(undefined, data)).toBe(result);
  });
});
