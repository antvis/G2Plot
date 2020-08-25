import { Box } from '../../../../src';
import { outliersData } from '../../../data/box';
import { createDiv } from '../../../utils/dom';

describe('box outliers', () => {
  it('with outliersField', () => {
    const box = new Box(createDiv('outliers'), {
      width: 400,
      height: 500,
      data: outliersData,
      xField: 'x',
      yField: ['low', 'q1', 'median', 'q3', 'high'],
      outliersField: 'outliers',
    });

    box.render();

    const view = box.chart.views[0];
    const geometry = view.geometries[0];

    // 类型
    expect(geometry.type).toBe('point');
    // 图形元素个数
    expect(geometry.elements.length).toBe(outliersData.length);
  });

  it('with outliersField style', () => {
    const box = new Box(createDiv('outliers'), {
      width: 400,
      height: 500,
      data: outliersData,
      xField: 'x',
      yField: ['low', 'q1', 'median', 'q3', 'high'],
      outliersField: 'outliers',
      outliersStyle: {
        fill: '#f6f',
      },
    });

    box.render();

    const view = box.chart.views[0];
    const elements = view.geometries[0].elements;

    // 类型
    expect(elements[0].shape.cfg.children[0].attr('fill')).toBe('#f6f');
  });
});
