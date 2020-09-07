import { Pie } from '../../../../src';
import { POSITIVE_NEGATIVE_DATA } from '../../../data/common';
import { createDiv } from '../../../utils/dom';

describe('pie', () => {
  const data = POSITIVE_NEGATIVE_DATA.filter((o) => o.value > 0).map((d, idx) =>
    idx === 1 ? { ...d, type: 'item1' } : d
  );
  it('theme', () => {
    const pie = new Pie(createDiv(), {
      width: 400,
      height: 300,
      data,
      angleField: 'value',
      colorField: 'type',
      radius: 0.8,
      theme: {
        colors10: ['blue', 'red', 'yellow', 'lightgreen', 'lightblue', 'pink'],
      },
    });

    pie.render();

    const geometry = pie.chart.geometries[0];
    const elements = geometry.elements;
    // 绘图数据
    expect(elements[0].getModel().style?.fill || elements[0].getModel().color).toBe('blue');
    expect(elements[1].getModel().style?.fill || elements[1].getModel().color).toBe('red');

    expect(pie.chart.getTheme().colors10).toEqual(['blue', 'red', 'yellow', 'lightgreen', 'lightblue', 'pink']);
  });
});
