import { Box } from '../../../../src';
import { boxData } from '../../../data/box';
import { createDiv } from '../../../utils/dom';

const default_range_field = '@@__range';

describe('column', () => {
  it('x*range range.min default as 0', () => {
    const column = new Box(createDiv('x*range range.min default as 0'), {
      width: 400,
      height: 500,
      data: boxData,
      xField: 'x',
      yField: ['low', 'q1', 'median', 'q3', 'high'],
    });

    column.render();

    const geometry = column.chart.geometries[0];
    const positionFields = geometry.getAttribute('position').getFields();

    // 类型
    expect(geometry.type).toBe('schema');
    // 图形元素个数
    expect(column.chart.geometries[0].elements.length).toBe(boxData.length);
    // x & range
    expect(positionFields).toHaveLength(2);

    // range meta default min = 0
    // @ts-ignore
    expect(geometry.scales[default_range_field].min).toBe(0);
  });
});
