import { Box } from '../../../../src';
import { boxData } from '../../../data/box';
import { createDiv } from '../../../utils/dom';

const default_range_field = '$$range$$';

describe('box', () => {
  it('x*range range.min default as 0', () => {
    const box = new Box(createDiv('x*range range.min default as 0'), {
      width: 400,
      height: 500,
      data: boxData,
      xField: 'x',
      yField: ['low', 'q1', 'median', 'q3', 'high'],
    });

    box.render();

    const geometry = box.chart.geometries[0];
    const positionFields = geometry.getAttribute('position').getFields();

    // 类型
    expect(geometry.type).toBe('schema');
    // 图形元素个数
    expect(box.chart.geometries[0].elements.length).toBe(boxData.length);
    // x & range
    expect(positionFields).toHaveLength(2);

    // range meta default min = 0
    // @ts-ignore
    expect(geometry.scales[default_range_field].min).toBe(0);
  });
});
