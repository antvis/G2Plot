import { transformDataToSankey } from '../../../../../src/plots/sankey/util/data';

describe('sankey util', () => {
  it('transformDataToSankey', () => {
    // @ts-ignore
    expect(transformDataToSankey({})).toEqual({ nodes: [], links: [] });
    // @ts-ignore
    expect(transformDataToSankey(1)).toEqual({ nodes: [], links: [] });

    expect(
      transformDataToSankey(
        [
          { source: '杭州', target: '上海', value: 1 },
          { source: '上海', target: '北京', value: 2 },
          { source: '杭州', target: '北京', value: 3 },
        ],
        'source',
        'target',
        'value'
      )
    ).toEqual({
      nodes: [{ name: '杭州' }, { name: '上海' }, { name: '北京' }],
      links: [
        { source: 0, target: 1, value: 1 },
        { source: 1, target: 2, value: 2 },
        { source: 0, target: 2, value: 3 },
      ],
    });
  });
});
