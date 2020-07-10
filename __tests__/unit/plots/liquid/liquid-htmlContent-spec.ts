import { Liquid } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('#1005', () => {
  const plot = new Liquid(createDiv(), {
    title: {
      visible: true,
      text: '水波图',
    },
    description: {
      visible: true,
      text: '水波图 - 百分比显示',
    },
    min: 0,
    max: 10000,
    value: 5639,
    statistic: {
      htmlContent: (v: number) => {
        return `<div class="liquid-statistic">${v}</div>`;
      },
    },
  });
  plot.render();

  it('render', () => {
    expect(document.getElementsByClassName('liquid-statistic')[0].innerHTML).toBe('5639');
  });
});
