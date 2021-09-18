import { IGroup } from '@antv/g-base';
import { Venn } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/plots/venn/constant';
import { VennData } from '../../../../src/plots/venn/types';
import { createDiv } from '../../../utils/dom';

describe('venn', () => {
  const data1 = [{ sets: ['A'], size: 10, label: 'A' }];

  const plot = new Venn(createDiv(), {
    width: 400,
    height: 500,
    setsField: 'sets',
    sizeField: 'size',
    data: data1,
    appendPadding: 0,
    legend: false,
  });

  it('sets: 1个集合', () => {
    plot.render();
    expect(plot.type).toBe('venn');
    // @ts-ignore
    expect(plot.getDefaultOptions()).toEqual(Venn.getDefaultOptions());

    // VennShape 已注册
    const elements = plot.chart.geometries[0].elements;
    expect(elements[0].shapeFactory['venn']).toBeDefined();

    expect(elements.length).toBe(1);
    expect((elements[0].getData() as any).size).toBe(10);
    // path: [['M', ...], ['A', rx ry 0 1 0 x y], ...]
    const path = (elements[0].shape as IGroup).getChildren()[0].attr('path');
    expect(path[0][0]).toBe('M');
    expect(path[1][0]).toBe('A');
    expect(path[2][0]).toBe('A');
    expect(path[1][1]).toBe(400 / 2);
  });

  it('sets: 2个集合 & changedata', () => {
    plot.changeData([
      { sets: ['A'], size: 10, label: 'A' },
      { sets: ['B'], size: 10, label: 'B' },
    ]);

    const elements = plot.chart.geometries[0].elements;

    expect(elements.length).toBe(2);
    expect(elements[0].getModel().size).toBe(1);
    expect(elements[1].getModel().size).toBe(1);
    // path: [['M', ...], ['A', rx ry 0 1 0 x y], ...]
    const path = (elements[0].shape as IGroup).getChildren()[0].attr('path');
    expect(path[0][0]).toBe('M');
    expect(path[1][0]).toBe('A');
    expect(path[2][0]).toBe('A');
    expect(path[1][1]).toBe(400 / 2 / 2);
    expect(path[1][6]).toBe(200);
    // 居中
    expect(path[1][7]).toBe(500 / 2);

    const path1 = (elements[1].shape as IGroup).getChildren()[0].attr('path');
    expect(path1[1][1]).toBe(400 / 2 / 2);
    expect(path1[1][6]).toBe(400);
    expect(path1[1][7]).toBe(500 / 2);
  });

  it('sets: 2个集合 & exist intersection', () => {
    plot.changeData([
      { sets: ['A'], size: 10, label: 'A' },
      { sets: ['B'], size: 10, label: 'B' },
      { sets: ['A', 'B'], size: 4, label: 'A&B' },
    ]);

    const elements = plot.chart.geometries[0].elements;

    expect(elements.length).toBe(3);
    // 📒 size 的具体计算逻辑，可以再看下
    expect((elements[0].getData() as any).size).toBe(10);
    expect((elements[1].getData() as any).size).toBe(10);
    expect((elements[2].getData() as any).size).toBe(4);
    // path: [['M', ...], ['A', rx ry 0 1 0 x y], ...]
    const path = (elements[0].shape as IGroup).getChildren()[0].attr('path');
    expect(path[0][0]).toBe('M');
    expect(path[1][0]).toBe('A');
    expect(path[2][0]).toBe('A');
    expect(path[1][1]).toBeGreaterThan(400 / 2 / 2);
    // 有交集，所以往前进一步
    expect(path[1][6]).toBeGreaterThan(200);
    // 居中
    expect(path[1][7]).toBeCloseTo(500 / 2);

    const path1 = (elements[1].shape as IGroup).getChildren()[0].attr('path');
    expect(path1[1][1]).toBeGreaterThan(400 / 2 / 2);
    expect(path1[1][6]).toBeLessThan(400);
    expect(path1[1][7]).toBeCloseTo(500 / 2);
  });

  it('sets: 3个集合 & exist intersection', () => {
    plot.changeData([
      { sets: ['A'], size: 12, label: 'A' },
      { sets: ['B'], size: 12, label: 'B' },
      { sets: ['C'], size: 12, label: 'C' },
      { sets: ['A', 'B'], size: 2, label: 'A&B' },
      { sets: ['A', 'C'], size: 2, label: 'A&C' },
      { sets: ['B', 'C'], size: 2, label: 'B&C' },
      { sets: ['A', 'B', 'C'], size: 1 },
    ]);

    const elements = plot.chart.geometries[0].elements;

    expect(elements.length).toBe(7);
    const path = (elements[0].shape as IGroup).getChildren()[0].attr('path');

    expect(path[0][0]).toBe('M');
    expect(path[1][0]).toBe('A');
    expect(path[2][0]).toBe('A');

    // 中心点
    expect((elements[6].getData() as any).x).toBeCloseTo(200);
    // 元素对齐
    expect(elements[2].getData().x).toBeCloseTo((elements[6].getData() as any).x, 1);
    expect(elements[0].getData().y).toBeCloseTo((elements[1].getData() as any).y, 1);
  });

  it('defaultOptions 保持从 constants 中获取', () => {
    expect(Venn.getDefaultOptions()).toEqual(DEFAULT_OPTIONS);
  });

  it('韦恩图数据结构类型定义 types & constants', () => {
    const vennData: VennData = [{ sets: [], size: 0, path: '', id: '' }];
    expect(vennData).toBeDefined();
  });

  afterAll(() => {
    plot.destroy();
  });
});
