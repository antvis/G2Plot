import { getProgressData } from '../../../../src/plots/progress/utils';

describe('getProgressData', () => {
  it('getProgressData', () => {
    expect(getProgressData(0)).toEqual([
      { type: 'current', percent: 0 },
      { type: 'target', percent: 1 },
    ]);

    expect(getProgressData(1)).toEqual([
      { type: 'current', percent: 1 },
      { type: 'target', percent: 0 },
    ]);

    expect(getProgressData(0.4)).toEqual([
      { type: 'current', percent: 0.4 },
      { type: 'target', percent: 0.6 },
    ]);

    expect(getProgressData(-1)).toEqual([
      { type: 'current', percent: 0 },
      { type: 'target', percent: 1 },
    ]);

    expect(getProgressData(2)).toEqual([
      { type: 'current', percent: 1 },
      { type: 'target', percent: 0 },
    ]);

    expect(getProgressData(NaN)).toEqual([
      { type: 'current', percent: 0 },
      { type: 'target', percent: 1 },
    ]);

    expect(getProgressData(null)).toEqual([
      { type: 'current', percent: 0 },
      { type: 'target', percent: 1 },
    ]);
  });
});
