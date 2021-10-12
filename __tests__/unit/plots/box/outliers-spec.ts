import { Box } from '../../../../src';
import { OUTLIERS_VIEW_ID, BOX_SYNC_NAME, BOX_RANGE } from '../../../../src/plots/box/constant';
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
    const outliersScale = view.getScaleByField('outliers');
    const yFieldScale = box.chart.getScaleByField(BOX_RANGE);

    // id
    expect(view.id).toBe(OUTLIERS_VIEW_ID);
    // 类型
    expect(geometry.type).toBe('point');
    // 图形元素个数
    const len = outliersData.reduce((r, d) => r + d.outliers.length, 0);
    expect(geometry.elements.length).toBe(len);
    // 同步y轴度量 axis sync
    // @ts-ignore
    expect(outliersScale.sync).toEqual(BOX_SYNC_NAME);
    // @ts-ignore
    expect(outliersScale.nice).toBeTruthy();
    // @ts-ignore
    expect(yFieldScale.sync).toEqual(BOX_SYNC_NAME);
    // @ts-ignore
    expect(yFieldScale.nice).toBeTruthy();

    box.destroy();
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
    expect(elements[0].shape.attr('fill')).toBe('#f6f');

    box.destroy();
  });
});
