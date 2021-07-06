import { Sunburst } from '../../../../src';
import { createDiv } from '../../../utils/dom';
import { SIMPLE_SUNBURST_DATA } from '../../../data/sunburst';

describe('sunburst: 字段信', () => {
  const div = createDiv();
  const plot = new Sunburst(div, {
    data: SIMPLE_SUNBURST_DATA,
  });
  plot.render();

  it('节点位置索引：nodeIndex', () => {
    const data = plot.chart.getData();

    expect(data[0][Sunburst.NODE_INDEX_FIELD]).toBe(0);
    expect(data[1][Sunburst.NODE_INDEX_FIELD]).toBe(1);

    expect(data[3][Sunburst.NODE_INDEX_FIELD]).toBe(0);
  });

  it('儿子节点数量：childNodeCount', () => {
    const data = plot.chart.getData();

    expect(data[0].childNodeCount).toBe(
      SIMPLE_SUNBURST_DATA.children.find((c) => c.name === data[0].name).children.length
    );
  });

  it('组件节点: ancestors', () => {
    const data = plot.chart.getData();

    expect(data[0].ancestors.length).toBe(0);
    expect(data[3].ancestors.length).toBe(1);
  });

  afterAll(() => {
    plot.destroy();
  });
});
