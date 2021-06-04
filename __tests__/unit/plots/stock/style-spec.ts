import { Stock } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { kdata } from '../../../data/stock';

describe('Stock', () => {
  it('set style', () => {
    const k = new Stock(createDiv('x*y'), {
      width: 400,
      height: 500,
      data: kdata,
      xField: 'date',
      yField: ['start', 'end', 'max', 'min'],
      style: {
        stroke: 'red',
        lineWidth: 2,
      },
    });

    k.render();

    // 图形元素个数
    expect(k.chart.geometries[0].elements[0].shape.attr('stroke')).toBe('red');
    expect(k.chart.geometries[0].elements[0].shape.attr('lineWidth')).toBe(2);

    k.destroy();
  });
});
