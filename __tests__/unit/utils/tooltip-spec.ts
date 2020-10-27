import { getTooltipMapping } from '../../../src/utils/tooltip';

describe('util tooltip', () => {
  it('getTooltipMapping', () => {
    expect(getTooltipMapping(false, [])).toEqual({});

    expect(getTooltipMapping({}, ['x'])).toEqual({});

    const fn = jest.fn();

    expect(
      getTooltipMapping(
        {
          fields: ['x', 'y'],
          formatter: fn,
        },
        ['a']
      )
    ).toEqual({ fields: ['x', 'y'], formatter: fn });

    expect(
      getTooltipMapping(
        {
          fields: ['x', 'y', 'z'],
        },
        ['b']
      )
    ).toEqual({ fields: ['x', 'y', 'z'], formatter: undefined });

    // 使用默认的 fields
    expect(
      getTooltipMapping(
        {
          formatter: fn,
        },
        ['c']
      )
    ).toEqual({ fields: ['c'], formatter: fn });
  });
});
