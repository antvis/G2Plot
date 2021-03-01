import { sankeyLeft, sankeyJustify } from 'd3-sankey';
import { sankeyLayout, getNodeAlignFunction, getDefaultOptions } from '../../../../src/utils/transform/sankey';
import { ENERGY } from '../../../data/sankey-energy';

describe('sankeyLayout', () => {
  it('getNodeAlignFunction', () => {
    expect(getNodeAlignFunction(null, null)).toBe(sankeyJustify);
    expect(getNodeAlignFunction(undefined, null)).toBe(sankeyJustify);
    // @ts-ignore
    expect(getNodeAlignFunction('middle', null)).toBe(sankeyJustify);

    expect(getNodeAlignFunction('left', null)).toBe(sankeyLeft);

    const fn = jest.fn();
    // @ts-ignore
    expect(getNodeAlignFunction(fn)).toBe(fn);

    expect(getNodeAlignFunction(sankeyLeft, () => 1)).not.toBe(sankeyLeft);

    // @ts-ignore
    expect(getNodeAlignFunction(123)).toBe(sankeyJustify);
  });

  it('getDefaultOptions', () => {
    expect(getDefaultOptions({}).nodeAlign).toBe('justify');
    expect(getDefaultOptions({}).nodePadding).toBe(0.03);
    expect(getDefaultOptions({}).nodeWidth).toBe(0.008);
  });

  it('sankeyLayout', () => {
    const data = sankeyLayout({}, ENERGY);
    expect(data.nodes.length).toBe(48);
    expect(data.links.length).toBe(68);

    expect(data.nodes[0].name).toBe("Agricultural 'waste'");
    expect(data.nodes[0].x).toEqual([0, 0.008, 0.008, 0]);
    expect(data.nodes[0].y).toEqual([
      0.15714829392583463,
      0.15714829392583463,
      0.17602864502202453,
      0.17602864502202453,
    ]);

    expect(data.links[0].source.name).toBe("Agricultural 'waste'");
    expect(data.links[0].target.name).toBe('Bio-conversion');
    expect(data.links[0].x).toEqual([0.008, 0.008, 0.1417142857142857, 0.1417142857142857]);
    expect(data.links[0].y).toEqual([
      0.17602864502202453,
      0.15714829392583463,
      0.23174113600532192,
      0.21286078490913202,
    ]);
  });
});
