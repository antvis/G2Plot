import { isArray, map } from '@antv/util';
import { TREND_FIELD, TREND_DOWN, TREND_UP, Y_FIELD } from './constant';

/**
 * @desc 股票图数据处理
 * @param data
 * @param yField
 */
export function getStockData(data, yField) {
  return map(data, (obj) => {
    if (isArray(yField)) {
      const [open, close, high, low] = yField;
      obj[TREND_FIELD] = obj[open] <= obj[close] ? TREND_UP : TREND_DOWN;
      obj[Y_FIELD] = [obj[open], obj[close], obj[high], obj[low]];
    }
    return obj;
  });
}
