import { getStockData } from '../../../../src/plots/stock/utils';
import { TREND_FIELD, TREND_UP, TREND_DOWN, Y_FIELD } from '../../../../src/plots/stock/constant';

describe('stock data', () => {
  it('stock data', () => {
    const yField: [string, string, string, string] = ['start', 'end', 'max', 'min'];
    const originalData = [
      { date: '2015-11-19', start: 8.18, max: 8.33, min: 7.98, end: 8.32, volumn: 1810, money: 14723.56 },
      { date: '2015-11-18', start: 8.37, max: 8.6, min: 8.03, end: 8.09, volumn: 2790.37, money: 23309.19 },
      { date: '2015-11-17', start: 8.7, max: 8.78, min: 8.32, end: 8.37, volumn: 3729.04, money: 31709.71 },
    ];
    const data = getStockData(originalData, yField);
    expect(data.length).toEqual(originalData.length);
    expect(data).toEqual([
      {
        date: '2015-11-19',
        start: 8.18,
        max: 8.33,
        min: 7.98,
        end: 8.32,
        volumn: 1810,
        money: 14723.56,
        [TREND_FIELD]: TREND_UP,
        [Y_FIELD]: [8.18, 8.32, 8.33, 7.98],
      },
      {
        date: '2015-11-18',
        start: 8.37,
        max: 8.6,
        min: 8.03,
        end: 8.09,
        volumn: 2790.37,
        money: 23309.19,
        [TREND_FIELD]: TREND_DOWN,
        [Y_FIELD]: [8.37, 8.09, 8.6, 8.03],
      },
      {
        date: '2015-11-17',
        start: 8.7,
        max: 8.78,
        min: 8.32,
        end: 8.37,
        volumn: 3729.04,
        money: 31709.71,
        [TREND_FIELD]: TREND_DOWN,
        [Y_FIELD]: [8.7, 8.37, 8.78, 8.32],
      },
    ]);
  });

  it('start = end', () => {
    const yField: [string, string, string, string] = ['start', 'end', 'max', 'min'];
    const originalData = [
      { date: '2015-11-19', start: 8.18, max: 8.33, min: 7.98, end: 8.18, volumn: 1810, money: 14723.56 },
    ];
    const data = getStockData(originalData, yField);
    expect(data).toEqual([
      {
        date: '2015-11-19',
        start: 8.18,
        max: 8.33,
        min: 7.98,
        end: 8.18,
        volumn: 1810,
        money: 14723.56,
        [TREND_FIELD]: TREND_UP,
        [Y_FIELD]: [8.18, 8.18, 8.33, 7.98],
      },
    ]);
  });

  it('contain invalid value', () => {
    const yField: [string, string, string, string] = ['start', 'end', 'max', 'min'];
    const originalData = [
      { date: '2015-11-19', start: undefined, max: 8.33, min: 7.98, end: null, volumn: 1810, money: 14723.56 },
    ];
    const data = getStockData(originalData, yField);
    expect(data).toEqual([
      {
        date: '2015-11-19',
        start: undefined,
        max: 8.33,
        min: 7.98,
        end: null,
        volumn: 1810,
        money: 14723.56,
        [TREND_FIELD]: TREND_DOWN,
        [Y_FIELD]: [undefined, null, 8.33, 7.98],
      },
    ]);
  });

  it('does not mutate original data item', () => {
    const yField: [string, string, string, string] = ['start', 'end', 'max', 'min'];
    const originalData = [
      { date: '2015-11-19', start: 8.18, max: 8.33, min: 7.98, end: 8.18, volumn: 1810, money: 14723.56 },
    ];
    const data = getStockData(originalData, yField);
    expect(data[0]).not.toBe(originalData[0]);
    expect(data).toEqual([
      {
        date: '2015-11-19',
        start: 8.18,
        max: 8.33,
        min: 7.98,
        end: 8.18,
        volumn: 1810,
        money: 14723.56,
        [TREND_FIELD]: TREND_UP,
        [Y_FIELD]: [8.18, 8.18, 8.33, 7.98],
      },
    ]);
  });

  it('contain invalid data item', () => {
    const yField: [string, string, string, string] = ['start', 'end', 'max', 'min'];
    const originalData = [null] as unknown as Record<string, any>[];
    const data = getStockData(originalData, yField);
    expect(data).toEqual([null]);
  });
});
