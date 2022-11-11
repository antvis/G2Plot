import { BOX_RANGE } from '../../../../src/plots/box/constant';
import { transformData } from '../../../../src/plots/box/utils';
import { boxData } from '../../../data/box';

describe('transformData', () => {
  it('normal data: typeof yField is array', () => {
    const data = transformData(boxData, ['low', 'q1', 'median', 'q3', 'high']);
    expect(data).toEqual([
      { x: 'Oceania', low: 1, q1: 9, median: 16, q3: 22, high: 24, [BOX_RANGE]: [1, 9, 16, 22, 24] },
      { x: 'East Europe', low: 1, q1: 5, median: 8, q3: 12, high: 16, [BOX_RANGE]: [1, 5, 8, 12, 16] },
      { x: 'Australia', low: 1, q1: 8, median: 12, q3: 19, high: 26, [BOX_RANGE]: [1, 8, 12, 19, 26] },
      { x: 'South America', low: 2, q1: 8, median: 12, q3: 21, high: 28, [BOX_RANGE]: [2, 8, 12, 21, 28] },
      { x: 'North Africa', low: 1, q1: 8, median: 14, q3: 18, high: 24, [BOX_RANGE]: [1, 8, 14, 18, 24] },
      { x: 'North America', low: 3, q1: 10, median: 17, q3: 28, high: 30, [BOX_RANGE]: [3, 10, 17, 28, 30] },
      { x: 'West Europe', low: 1, q1: 7, median: 10, q3: 17, high: 22, [BOX_RANGE]: [1, 7, 10, 17, 22] },
      { x: 'West Africa', low: 1, q1: 6, median: 8, q3: 13, high: 16, [BOX_RANGE]: [1, 6, 8, 13, 16] },
    ]);
  });

  it('normal data: typeof yField is not array', () => {
    const data = transformData(boxData, 'low');
    expect(data).toEqual(boxData);
  });

  it('invalid data: typeof yField is array', () => {
    const data = [
      { x: 'Oceania', low: 1, q1: 9, median: 16, q3: undefined, high: 24 },
      { x: 'East Europe', low: 1, q1: undefined, median: 8, q3: 12, high: 16 },
      { x: 'Australia', low: 1, q1: 8, median: 12, q3: 19, high: 26 },
      { x: 'South America', low: 2, q1: 8, median: null, q3: 21, high: null },
    ];

    const newData = transformData(data, ['low', 'q1', 'median', 'q3', 'high']);
    expect(newData).toEqual([
      { x: 'Oceania', low: 1, q1: 9, median: 16, q3: undefined, high: 24, [BOX_RANGE]: [1, 9, 16, undefined, 24] },
      { x: 'East Europe', low: 1, q1: undefined, median: 8, q3: 12, high: 16, [BOX_RANGE]: [1, undefined, 8, 12, 16] },
      { x: 'Australia', low: 1, q1: 8, median: 12, q3: 19, high: 26, [BOX_RANGE]: [1, 8, 12, 19, 26] },
      { x: 'South America', low: 2, q1: 8, median: null, q3: 21, high: null, [BOX_RANGE]: [2, 8, null, 21, null] },
    ]);
  });

  it('invalid data: typeof yField is not array', () => {
    const data = [
      { x: 'Oceania', low: 1, q1: 9, median: 16, q3: undefined, high: 24 },
      { x: 'East Europe', low: 1, q1: undefined, median: 8, q3: 12, high: 16 },
      { x: 'Australia', low: 1, q1: 8, median: 12, q3: 19, high: 26 },
      { x: 'South America', low: 2, q1: 8, median: null, q3: 21, high: null },
    ];

    const newData = transformData(data, 'low');
    expect(newData).toEqual(data);
  });
});
