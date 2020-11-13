import { PaddingCal } from '@antv/g2/lib/chart/layout/padding-cal';
import { isHorizontal, transformData, syncViewPadding } from '../../../../src/plots/bidirectional-bar/utils';

describe('util', () => {
  it('isHorizontal', () => {
    // @ts-ignore
    expect(isHorizontal('a')).toBe(true);
    expect(isHorizontal(undefined)).toBe(true);
    expect(isHorizontal('vertical')).toBe(false);
    expect(isHorizontal('horizontal')).toBe(true);
  });

  it('transformData', () => {
    const data = [
      { x: 'a', y1: 10, y2: 20, y3: 30 },
      { x: 'b', y1: 11, y2: 21, y3: 31 },
    ];

    expect(transformData('x', ['y1', 'y2'], data)).toEqual([
      { type: 'y1', x: 'a', y1: 10 },
      { type: 'y1', x: 'b', y1: 11 },
      { type: 'y2', x: 'a', y2: 20 },
      { type: 'y2', x: 'b', y2: 21 },
    ]);
  });

  it('syncViewPadding', () => {
    const chart = {
      __axisPosition: {},
    };

    const v1: any = {};
    const v2: any = {};

    syncViewPadding(chart, [v1, v2], PaddingCal);

    expect(v1.autoPadding).toEqual({});
  });
});
