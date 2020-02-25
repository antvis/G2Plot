import fecha from 'fecha';
import * as _ from '@antv/util';
import { DataItem } from '../..';
import { DATE_FIELD, DAY_FIELD, FORMATTER, WEEK_FIELD } from './constant';
import { advanceBy, DAY_MS, getDay, getWeek } from '../../util/date';

/**
 * 解析日期
 * @param dateRange
 */
function parseDateRange(dateRange: string[]): Date[] {
  const [from, to] = dateRange;

  let fromDate = fecha.parse(from, FORMATTER);
  let toDate = fecha.parse(to, FORMATTER);

  // 交换顺序
  if (fromDate > toDate) {
    [toDate, fromDate] = [fromDate, toDate];
  }

  return [fromDate, toDate];
}

/**
 * 根据 range 补齐日历图的数据
 * @param data 传入数据
 * @param dateRange 日期区间
 * @param dateField 日期字段
 */
export function generateCalendarData(data: DataItem[], dateRange: string[], dateField: string): DataItem[] {
  const all = [];

  const [fromDate, toDate] = parseDateRange(dateRange);
  // copy 一份
  const curr = new Date(fromDate);
  while (curr <= toDate) {
    const dateString = fecha.format(curr, FORMATTER);
    // 找到对应的数据
    const datum = _.find(data, (datum: DataItem) => datum[dateField] === dateString);

    all.push({
      [DAY_FIELD]: getDay(curr),
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

/**
 * 计算每个月的中间周。
 */
export function getMonthCenterWeek(dateRange: string[]): Record<number, number> {
  const [fromDate, toDate] = parseDateRange(dateRange);

  const monthWeekMap = new Map<number, number[]>();

  function append(current: Date) {
    const month = current.getMonth(); // 从 0 开始
    const week = getWeek(current);

    if (!monthWeekMap.has(month)) {
      monthWeekMap.set(month, []);
    }

    monthWeekMap.get(month).push(week);
  }

  // copy 一份
  const curr = new Date(fromDate);
  while (curr <= toDate) {
    // 设置到 map 中
    append(curr);

    // 向前移动 7 天（一周）
    advanceBy(curr, DAY_MS * 7);
  }

  // 增加最后一个日期的计算
  if (toDate < curr) {
    append(toDate);
  }

  // 处理数据，返回结果
  const result: Record<number, number> = {}; // week -> month

  monthWeekMap.forEach((v: number[], k: number) => {
    const w = Math.ceil((_.head(v) + _.last(v)) / 2); // 取平均值
    result[w] = k;
  });

  return result;
}
