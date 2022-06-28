import { PERCENT, RANGE_TYPE, RANGE_VALUE } from '../../../../src/plots/gauge/constants';
import { getIndicatorData, getRangeData } from '../../../../src/plots/gauge/utils';

describe('gauge utils to getData', () => {
  it('get indicatorData', () => {
    expect(getIndicatorData(0.1)).toEqual([{ [PERCENT]: 0.1 }]);
    expect(getIndicatorData(1.4)).toEqual([{ [PERCENT]: 1 }]);
    expect(getIndicatorData(-0.4)).toEqual([{ [PERCENT]: 0 }]);
  });

  it('get rangeData', () => {
    expect(getRangeData(0.5, { ticks: [0, 0.3, 1] })).toEqual([
      { [RANGE_VALUE]: 0.3, [RANGE_TYPE]: '0', [PERCENT]: 0.5 },
      { [RANGE_VALUE]: 0.7, [RANGE_TYPE]: '1', [PERCENT]: 0.5 },
    ]);

    expect(getRangeData(0.5)).toEqual([
      { [RANGE_VALUE]: 0.5, [RANGE_TYPE]: '0', [PERCENT]: 0.5 },
      { [RANGE_VALUE]: 0.5, [RANGE_TYPE]: '1', [PERCENT]: 0.5 },
    ]);

    expect(getRangeData(1.5)).toEqual([
      { [RANGE_VALUE]: 1, [RANGE_TYPE]: '0', [PERCENT]: 1.5 },
      { [RANGE_VALUE]: 0, [RANGE_TYPE]: '1', [PERCENT]: 1.5 },
    ]);

    expect(getRangeData(0)).toEqual([
      { [RANGE_VALUE]: 0, [RANGE_TYPE]: '0', [PERCENT]: 0 },
      { [RANGE_VALUE]: 1, [RANGE_TYPE]: '1', [PERCENT]: 0 },
    ]);
    expect(getRangeData(1)).toEqual([
      { [RANGE_VALUE]: 1, [RANGE_TYPE]: '0', [PERCENT]: 1 },
      { [RANGE_VALUE]: 0, [RANGE_TYPE]: '1', [PERCENT]: 1 },
    ]);
  });
});
