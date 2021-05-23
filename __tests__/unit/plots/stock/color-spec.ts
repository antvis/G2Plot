import { Stock } from '../../../../src';
import { createDiv, removeDom } from '../../../utils/dom';
import { kdata as data } from '../../../data/stock';
import { DEFAULT_OPTIONS } from '../../../../src/plots/stock/constant';

describe('Stock', () => {
  const div = createDiv('x*y');
  const plot = new Stock(div, {
    width: 400,
    height: 500,
    data,
    xField: 'date',
    yField: ['start', 'end', 'max', 'min'],
  });

  it('color', () => {
    plot.render();

    // 图形元素个数
    expect(plot.chart.geometries[0].elements.length).toBe(data.length);
    expect(plot.chart.geometries[0].elements[0].shape.attr('fill')).toBe(DEFAULT_OPTIONS.risingFill);
    // datum.start < datum.end 上涨
    expect(plot.chart.geometries[0].elements[data.length - 2].shape.attr('fill')).toBe(DEFAULT_OPTIONS.fallingFill);
  });

  it('change color', () => {
    plot.update({
      // 绿涨红跌
      fallingFill: '#ef5350',
      risingFill: '#26a69a',
    });
    // 图形元素个数
    expect(plot.chart.geometries[0].elements.length).toBe(data.length);
    expect(plot.chart.geometries[0].elements[0].shape.attr('fill')).toBe(DEFAULT_OPTIONS.fallingFill);
    // datum.start < datum.end 上涨
    expect(plot.chart.geometries[0].elements[data.length - 2].shape.attr('fill')).toBe(DEFAULT_OPTIONS.risingFill);
  });

  afterAll(() => {
    removeDom(div);
    plot.destroy();
  });
});
