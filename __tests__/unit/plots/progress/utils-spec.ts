import { getProgressData } from '../../../../src/plots/progress/utils';

describe('getProgressData', () => {
  it('getProgressData', () => {
    expect(getProgressData(0)).toEqual([
      { current: '0', type: 'current', percent: 0 },
      { current: '0', type: 'target', percent: 1 },
    ]);

    expect(getProgressData(1)).toEqual([
      { current: '1', type: 'current', percent: 1 },
      { current: '1', type: 'target', percent: 1 },
    ]);

    expect(getProgressData(0.4)).toEqual([
      { current: '0.4', type: 'current', percent: 0.4 },
      { current: '0.4', type: 'target', percent: 1 },
    ]);

    expect(getProgressData(-1)).toEqual([
      { current: '0', type: 'current', percent: 0 },
      { current: '0', type: 'target', percent: 1 },
    ]);

    expect(getProgressData(2)).toEqual([
      { current: '1', type: 'current', percent: 1 },
      { current: '1', type: 'target', percent: 1 },
    ]);

    expect(getProgressData(NaN)).toEqual([
      { current: '0', type: 'current', percent: 0 },
      { current: '0', type: 'target', percent: 1 },
    ]);

    expect(getProgressData(null)).toEqual([
      { current: '0', type: 'current', percent: 0 },
      { current: '0', type: 'target', percent: 1 },
    ]);
  });
});
