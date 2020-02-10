import {
  isLastWeekOfMonth,
  isLastDayOfMonth,
  getWeek,
  getDay,
  advanceBy, DAY_MS,
} from '../../../src/util/date';

describe('date util', () => {
  it('isLastWeekOfMonth', () => {
    expect(isLastWeekOfMonth(new Date('2019-12-22'))).toBe(false);
    expect(isLastWeekOfMonth(new Date('2019-12-24'))).toBe(false);
    expect(isLastWeekOfMonth(new Date('2019-12-25'))).toBe(true);
    expect(isLastWeekOfMonth(new Date('2019-12-31'))).toBe(true);
  });

  it('isLastDayOfMonth', () => {
    expect(isLastDayOfMonth(new Date('2020-02-28'))).toBe(false);
    expect(isLastDayOfMonth(new Date('2020-02-29'))).toBe(true);
  });

  it('getWeek', () => {
    expect(getWeek(new Date('2020-02-07'))).toBe(6);
    expect(getWeek(new Date('2020-02-08'))).toBe(7);
    expect(getWeek(new Date('2020-02-09'))).toBe(7);
    expect(getWeek(new Date('2020-02-10'))).toBe(7);
  });

  it('getDay', () => {
    expect(getDay(new Date('2019-12-24'))).toBe(2);
    expect(getDay(new Date('2019-12-31'))).toBe(2);
  });

  it('advanceBy', () => {
    const d = new Date('2019-12-10');
    expect(advanceBy(d, -DAY_MS).getDay()).toBe(1);
    expect(advanceBy(d, DAY_MS).getDay()).toBe(2);
  });
});
