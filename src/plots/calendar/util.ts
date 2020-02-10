import fecha from 'fecha';
import * as _ from '@antv/util';
import { DataItem } from '../..';
import { DATE_FIELD, DAY_FIELD, FORMATTER, WEEK_FIELD } from './constant';
import { advanceBy, DAY_MS, getDay, getWeek } from '../../util/date';

/**
 * 根据 range 补齐日历图的数据
 * @param data 传入数据
 * @param dateRange 日期区间
 * @param dateField 日期字段
 */
export function generateCalendarData(data: DataItem[], dateRange: string[], dateField: string): DataItem[] {
  const [from, to] = dateRange;

  let fromDate = fecha.parse(from, FORMATTER);
  let toDate = fecha.parse(to, FORMATTER);

  const all = [];

  // 交换顺序
  if (fromDate > toDate) {
    [toDate, fromDate] = [fromDate, toDate];
  }

  // copy 一份
  const curr = new Date(fromDate);
  while (curr <= toDate) {
    const dateString = fecha.format(curr, FORMATTER);
    // 找到对应的数据
    const datum = _.find(data, (datum: DataItem) => datum[dateField] === dateString);

    all.push({
      [DAY_FIELD]: `${getDay(curr)}`,
      [WEEK_FIELD]: `${getWeek(curr)}`,
      [dateField]: dateString,
      [DATE_FIELD]: new Date(curr), // copy
      ...datum,
    });

    // 向前移动一天
    advanceBy(curr, DAY_MS);
  }

  return all;
}

