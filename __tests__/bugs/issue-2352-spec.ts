import { Sankey } from '../../src';
import { pick } from '../../src/utils/pick';
import { createDiv } from '../utils/dom';

describe('#2352', () => {
  const DATA = [
    {
      source: 's1',
      target: 't1',
      weight: 10,
    },
    {
      source: 's2',
      target: 't2',
      weight: 20,
    },
    {
      source: 's3',
      target: 't3',
      weight: 30,
    },
  ];

  it('data order should be keep', () => {
    const sankey = new Sankey(createDiv(), {
      data: DATA,
      padding: 0,
      appendPadding: 0,
      width: 500,
      height: 500,
      autoFit: false,
      sourceField: 'source',
      targetField: 'target',
      weightField: 'weight',
    });

    sankey.render();

    // 1. 图形镜像
    // @ts-ignore
    expect(sankey.chart.getCoordinate().isReflectY).toBe(true);
    const s1BBox = sankey.chart.views[1].geometries[0].elements[0].shape.getBBox();
    // 顶着左上角
    expect(s1BBox.x < 1).toBe(true);
    expect(s1BBox.y < 1).toBe(true);

    // 2. 空白
    const xScale = sankey.chart.getScaleByField('x');
    const yScale = sankey.chart.getScaleByField('y');
    expect(pick(xScale, ['min', 'max', 'minLimit', 'maxLimit', 'sync'])).toEqual({
      sync: true,
      min: 0,
      max: 1,
      minLimit: 0,
      maxLimit: 1,
    });
    expect(pick(yScale, ['min', 'max', 'minLimit', 'maxLimit', 'sync'])).toEqual({
      sync: true,
      min: 0,
      max: 1,
      minLimit: 0,
      maxLimit: 1,
    });
<<<<<<< HEAD

    sankey.destroy();
=======
>>>>>>> fix(sankey): 图形和数据顺序不一致,布局存在空白区域
  });
});
