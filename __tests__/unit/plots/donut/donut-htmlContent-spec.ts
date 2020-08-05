import { Donut } from '../../../../src';
import { createDiv } from '../../../utils/dom';

describe('htmlConent string', () => {
  const data = [
    {
      type: '分类一',
      value: 27,
    },
    {
      type: '分类二',
      value: 25,
    },
    {
      type: '分类三',
      value: 18,
    },
    {
      type: '分类四',
      value: 15,
    },
    {
      type: '分类五',
      value: 10,
    },
    {
      type: 'Other',
      value: 5,
    },
  ];
  const plot = new Donut(createDiv(), {
    title: {
      visible: true,
      text: '环图',
    },
    width: 300,
    height: 500,
    data,
    angleField: 'value',
    colorField: 'type',
    statistic: {
      visible: true,
      htmlContent: () => {
        return '<div class="donut-statistic">100</div>';
      },
    },
  });
  plot.render();

  it('render', () => {
    expect(document.getElementsByClassName('donut-statistic')[0].innerHTML).toBe('100');
  });
});
