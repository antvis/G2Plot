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

    expect(transformData('x', ['y1', 'y2'], 'type', data)).toEqual([
      { type: 'y1', x: 'a', y1: 10 },
      { type: 'y1', x: 'b', y1: 11 },
      { type: 'y2', x: 'a', y2: 20 },
      { type: 'y2', x: 'b', y2: 21 },
    ]);
  });

  it('syncViewPadding * horizontal * top', () => {
    const chart = {
      __axisPosition: {
        position: 'top',
        layout: 'horizontal',
      },
    };

    const v1: any = {
      autoPadding: {
        top: 20,
        right: 10,
        bottom: 10,
        left: 20,
      },
    };
    const v2: any = {
      autoPadding: {
        top: 20,
        right: 0,
        bottom: 10,
        left: 20,
      },
    };

    syncViewPadding(chart, [v1, v2], PaddingCal);
    expect(v1.autoPadding).toEqual({
      top: 20,
      right: 0,
      bottom: 10,
      left: 20,
    });
    expect(v2.autoPadding).toEqual({
      top: 20,
      right: 20,
      bottom: 10,
      left: 0,
    });
  });
  it('syncViewPadding * horizontal * bottom', () => {
    const chart = {
      __axisPosition: {
        position: 'bottom',
        layout: 'horizontal',
      },
    };

    const v1: any = {
      autoPadding: {
        top: 20,
        right: 10,
        bottom: 10,
        left: 20,
      },
    };
    const v2: any = {
      autoPadding: {
        top: 20,
        right: 10,
        bottom: 10,
        left: 20,
      },
    };

    syncViewPadding(chart, [v1, v2], PaddingCal);
    expect(v1.autoPadding).toEqual({
      top: 20,
      right: 10 / 2 + 5,
      bottom: 10,
      left: 20,
    });
    expect(v2.autoPadding).toEqual({
      top: 20,
      right: 10,
      bottom: 10,
      left: 10 / 2 + 5,
    });
  });

  it('syncViewPadding * vertical * top', () => {
    const chart = {
      __axisPosition: {
        position: 'top',
        layout: 'vertical',
      },
    };

    const v1: any = {
      autoPadding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      },
    };
    const v2: any = {
      autoPadding: {
        top: 10,
        right: 10,
        bottom: 0,
        left: 15,
      },
    };
    const left = v1.autoPadding.left >= v2.autoPadding.left ? v1.autoPadding.left : v2.autoPadding.left;
    syncViewPadding(chart, [v1, v2], PaddingCal);

    expect(v1.autoPadding.left).toEqual(left);
    expect(v2.autoPadding.left).toEqual(left);

    expect(v1.autoPadding).toEqual({
      top: 10,
      right: 10,
      bottom: 0,
      left: left,
    });
    expect(v2.autoPadding).toEqual({
      top: 0,
      right: 10,
      bottom: 10,
      left: left,
    });
  });
  it('syncViewPadding * vertical * bottom', () => {
    const chart = {
      __axisPosition: {
        position: 'bottom',
        layout: 'vertical',
      },
    };

    const v1: any = {
      autoPadding: {
        top: 0,
        right: 10,
        bottom: 20,
        left: 10,
      },
    };
    const v2: any = {
      autoPadding: {
        top: 10,
        right: 10,
        bottom: 0,
        left: 15,
      },
    };
    const left = v1.autoPadding.left >= v2.autoPadding.left ? v1.autoPadding.left : v2.autoPadding.left;
    syncViewPadding(chart, [v1, v2], PaddingCal);

    expect(v1.autoPadding.left).toEqual(left);
    expect(v2.autoPadding.left).toEqual(left);

    expect(v1.autoPadding).toEqual({
      top: 0,
      right: 10,
      bottom: 20 / 2 + 5,
      left: left,
    });
    expect(v2.autoPadding).toEqual({
      top: 20 / 2 + 5,
      right: 10,
      bottom: 0,
      left: left,
    });
  });
});
