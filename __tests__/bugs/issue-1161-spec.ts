import { isFinite } from '@antv/util';
import { Pie } from '../../src';
import { createDiv } from '../utils/dom';

describe('#1161: 饼图数据全空的展示优化处理', () => {
  const config = {
    data: [
      { type: '分类一', value: 0 },
      { type: '分类二', value: 0 },
      { type: '分类三', value: 0 },
      { type: '分类四', value: 0 },
    ],
    angleField: 'value',
    colorField: 'type',
    pieStyle: {
      // 不描边,避免影响计算
      lineWidth: 0,
    },
  };

  it('数据全为 0: element 均分展示', () => {
    const div = createDiv();
    const pie = new Pie(div, config);
    pie.render();
    const elements = pie.getLayer().getPlot().geometries[0].elements;
    expect(elements.length).toBe(4);

    const box1 = elements[0].getBBox();
    const box2 = elements[1].getBBox();
    const box3 = elements[2].getBBox();
    const box4 = elements[3].getBBox();
    expect(box1.x).toBeCloseTo(box2.x);
    expect(box1.minX).toBeCloseTo(box2.minX);
    expect(box1.maxX).toBeCloseTo(box2.maxX);
    expect(box1.x).not.toBeCloseTo(box3.x);

    expect(box1.y).toBeCloseTo(box4.y);
    expect(box1.maxY).toBeCloseTo(box4.maxY);
    expect(box1.y).not.toBeCloseTo(box3.y);

    expect(box4.x).toBeCloseTo(box3.x);
    expect(box4.minX).toBeCloseTo(box3.minX);
    expect(box4.maxX).toBeCloseTo(box3.maxX);

    expect(box2.y).toBeCloseTo(box3.y);
    expect(box2.maxY).toBeCloseTo(box3.maxY);
  });

  it('数据全为空，部分为 0,部分为 null: 0 值的 element 均分展示', () => {
    const div = createDiv();
    const pie = new Pie(div, { ...config, data: config.data.concat({ type: '分类五', value: null }) });
    pie.render();
    const elements = pie.getLayer().getPlot().geometries[0].elements;
    expect(elements.length).toBe(5);
    const box1 = elements[0].getBBox();
    const box2 = elements[1].getBBox();
    const box3 = elements[2].getBBox();
    const box4 = elements[3].getBBox();
    const box5 = elements[4].getBBox();

    expect(box1.x).toBeCloseTo(box2.x);
    expect(box1.minX).toBeCloseTo(box2.minX);
    expect(box1.maxX).toBeCloseTo(box2.maxX);
    expect(box1.x).not.toBeCloseTo(box3.x);

    expect(box1.y).toBeCloseTo(box4.y);
    expect(box1.maxY).toBeCloseTo(box4.maxY);
    expect(box1.y).not.toBeCloseTo(box3.y);

    expect(box4.x).toBeCloseTo(box3.x);
    expect(box4.minX).toBeCloseTo(box3.minX);
    expect(box4.maxX).toBeCloseTo(box3.maxX);

    expect(box2.y).toBeCloseTo(box3.y);
    expect(box2.maxY).toBeCloseTo(box3.maxY);

    if (isFinite(box5.width)) {
      expect(box5.width).toBeCloseTo(1);
    }
  });

  it('数据全为空，且全部为 null: element 均分展示', () => {
    const div = createDiv();
    const pie = new Pie(div, { ...config, data: config.data.map((v) => ({ ...v, value: null })) });
    pie.render();
    const elements = pie.getLayer().getPlot().geometries[0].elements;
    expect(elements.length).toBe(4);
    const box1 = elements[0].getBBox();
    const box2 = elements[1].getBBox();
    const box3 = elements[2].getBBox();
    const box4 = elements[3].getBBox();
    expect(box1.x).toBeCloseTo(box2.x);
    expect(box1.minX).toBeCloseTo(box2.minX);
    expect(box1.maxX).toBeCloseTo(box2.maxX);
    expect(box1.x).not.toBeCloseTo(box3.x);

    expect(box1.y).toBeCloseTo(box4.y);
    expect(box1.maxY).toBeCloseTo(box4.maxY);
    expect(box1.y).not.toBeCloseTo(box3.y);

    expect(box4.x).toBeCloseTo(box3.x);
    expect(box4.minX).toBeCloseTo(box3.minX);
    expect(box4.maxX).toBeCloseTo(box3.maxX);

    expect(box2.y).toBeCloseTo(box3.y);
    expect(box2.maxY).toBeCloseTo(box3.maxY);
  });
});
