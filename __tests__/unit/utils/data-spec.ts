import { adjustYMetaByZero, transformDataToNodeLinkData } from '../../../src/utils/data';

describe('data', () => {
  it('adjustYMetaByZero', () => {
    expect(adjustYMetaByZero([{ y: -1 }, { y: 1 }], 'y')).toEqual({});

    expect(adjustYMetaByZero([{ y: 0 }, { y: 1 }], 'y')).toEqual({ min: 0 });
    expect(adjustYMetaByZero([{ y: 20 }, { y: 20 }], 'y')).toEqual({ min: 0 });
    expect(adjustYMetaByZero([{ y: -20 }, { y: -20 }], 'y')).toEqual({ max: 0 });

    expect(adjustYMetaByZero([{ y: 20 }, { y: 20 }, { y: null }], 'y')).toEqual({ min: 0 });
    expect(adjustYMetaByZero([{ y: -20 }, { y: -20 }, { y: 0 }], 'y')).toEqual({ max: 0 });
    expect(adjustYMetaByZero([{ y: -20 }, { y: -20 }, { y: undefined }], 'y')).toEqual({ max: 0 });

    expect(adjustYMetaByZero([{ y: null }, { y: 0 }, { y: undefined }], 'y')).toEqual({ min: 0 });

    expect(adjustYMetaByZero([{ y: null }, { y: 0 }, { y: NaN }], 'y')).toEqual({ min: 0 });
    expect(adjustYMetaByZero([{ y: 20 }, { y: 20 }, { y: NaN }], 'y')).toEqual({ min: 0 });
    expect(adjustYMetaByZero([{ y: -20 }, { y: -20 }, { y: NaN }], 'y')).toEqual({ max: 0 });
  });
  it('transformDataToNodeLinkData', () => {
    // @ts-ignore
    expect(transformDataToNodeLinkData({})).toEqual({ nodes: [], links: [] });
    // @ts-ignore
    expect(transformDataToNodeLinkData(1)).toEqual({ nodes: [], links: [] });

    expect(
      transformDataToNodeLinkData(
        [
          { source: '北京', target: '天津', value: 30 },
          { source: '北京', target: '上海', value: 80 },
          { source: '上海', target: '黑龙江', value: 16 },
        ],
        'source',
        'target',
        'value'
      )
    ).toEqual({
      nodes: [
        { id: 0, name: '北京' },
        { id: 1, name: '天津' },
        { id: 2, name: '上海' },
        { id: 3, name: '黑龙江' },
      ],
      links: [
        { source: 0, target: 1, value: 30 },
        { source: 0, target: 2, value: 80 },
        { source: 2, target: 3, value: 16 },
      ],
    });
  });
});
