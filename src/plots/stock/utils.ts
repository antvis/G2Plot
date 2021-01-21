import { map } from '@antv/util';
import { TREND_FIELD, TREND_DOWN, TREND_UP, Y_FIELD, TREND_NORMAL } from './constant';

/**
 * @desc 股票图数据处理
 * @param data
 * @param yField
 */
export function getStockData(data, options) {
  const { trendField, trend, yField } = options;

  const [open, close, high, low] = yField;
  const _trendField = trendField || TREND_FIELD;

  // 自定义上涨或下跌的逻辑，用于展示
  // 蜡烛图一般上涨、下跌的颜色，所以color特殊处理
  const defaultTrend = (item) => {
    const openVal = item[open],
      closeVal = item[close];
    if (openVal < closeVal) return TREND_UP;
    else if (openVal > closeVal) return TREND_DOWN;
    // 这个场景在不同的厂商有不同的定义：有的是昨日收盘价跟今日收盘价比较来决定上涨或下跌  这里默认按照按单天的开盘价等于收盘价定义然后显示黑色
    else return TREND_NORMAL;
  };

  return map(data, (obj, index) => {
    obj[_trendField] = trend ? trend(obj, index) : defaultTrend(obj);
    obj[Y_FIELD] = [obj[open], obj[close], obj[high], obj[low]];
    return obj;
  });
}
