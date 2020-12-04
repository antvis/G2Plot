import { transformDataToChord } from '../../../../../src/plots/chord/util/data';

describe('chord util', () => {
  it('transformDataToChord', () => {
    // @ts-ignore
    expect(transformDataToChord({})).toEqual({ nodes: [], links: [] });
    // @ts-ignore
    expect(transformDataToChord(1)).toEqual({ nodes: [], links: [] });

    expect(
      transformDataToChord(
        [
          { source: '北京', target: '天津', sourceWeight: 30, targetWeight: 30 },
          { source: '北京', target: '上海', sourceWeight: 80, targetWeight: 80 },
          { source: '上海', target: '黑龙江', sourceWeight: 16, targetWeight: 16 },
        ],
        'source',
        'target',
        'sourceWeight',
        'targetWeight'
      )
    ).toEqual({
      nodes: [
        { id: 0, name: '北京' },
        { id: 1, name: '天津' },
        { id: 2, name: '上海' },
        { id: 3, name: '黑龙江' },
      ],
      links: [
        { source: 0, target: 1, sourceName: '北京', targetName: '天津', sourceWeight: 30, targetWeight: 30 },
        { source: 0, target: 2, sourceName: '北京', targetName: '上海', sourceWeight: 80, targetWeight: 80 },
        { source: 2, target: 3, sourceName: '上海', targetName: '黑龙江', sourceWeight: 16, targetWeight: 16 },
      ],
    });
  });
});
