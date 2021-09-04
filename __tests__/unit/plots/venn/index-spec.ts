import { group } from '@antv/util';
import { Venn } from '../../../../src';
import { DEFAULT_OPTIONS } from '../../../../src/plots/venn/constant';
import { createDiv } from '../../../utils/dom';

describe('venn', () => {
  const data1 = [{ sets: ['A'], size: 10, label: 'A' }];
  const data2 = [
    { sets: ['A'], size: 10, label: 'A' },
    { sets: ['B'], size: 10, label: 'B' },
    { sets: ['A', 'B'], size: 4, label: 'A&B' },
  ];
  const data3 = [
    { sets: ['A'], size: 10, label: 'A' },
    { sets: ['B'], size: 10, label: 'B' },
    { sets: ['C'], size: 10, label: 'C' },
    { sets: ['A', 'B'], size: 4, label: 'A&B' },
    { sets: ['A', 'C'], size: 4, label: 'A&C' },
    { sets: ['B', 'C'], size: 2, label: 'B&C' },
    { sets: ['A', 'B', 'C'], size: 2, label: 'A&B&C' },
    // 这是错误数据...
    // { sets: ['A', 'B', 'C'], size: 3, label: 'A&B&C' },
  ];

  const plot = new Venn(createDiv(), {
    width: 400,
    height: 500,
    data: data1,
  });

  it('sets: 1个集合', () => {
    plot.render();
    expect(plot.type).toBe('venn');
    // @ts-ignore
    expect(plot.getDefaultOptions()).toEqual(Venn.getDefaultOptions());

    // 默认 shape 为 venn
    expect(plot.chart.geometries[0].elements[0].shapeFactory['venn']).toBeDefined();
  });

  it('defaultOptions 保持从 constants 中获取', () => {
    expect(Venn.getDefaultOptions()).toEqual(DEFAULT_OPTIONS);
  });

  afterAll(() => {
    plot.destroy();
  });
});
