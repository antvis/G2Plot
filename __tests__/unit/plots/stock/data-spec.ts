import { kdata } from '../../../data/stock';
import { getStockData } from '../../../../src/plots/stock/utils';
import { TREND_FIELD, TREND_UP, TREND_DOWN, Y_FIELD } from '../../../../src/plots/stock/constant';

describe('stock data', () => {
  it('stock data', () => {
    const yField = ['start', 'end', 'max', 'min'];
    const data = getStockData(kdata, yField);
    expect(data.length).toEqual(kdata.length);
    data.map((item) => {
      const [start, end, high, low] = yField;
      expect(item[TREND_FIELD]).toEqual(item[start] <= item[end] ? TREND_UP : TREND_DOWN);
      expect(item[Y_FIELD]).toEqual([item[start], item[end], item[high], item[low]]);
    });
  });
});
