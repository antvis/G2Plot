import { getYearRange, generateCalendarData } from '../../../../src/plots/calendar/util';

describe('Calendar util', () => {
  it('getYearRange', () => {
    expect(getYearRange()).toEqual(getYearRange(new Date()));

    expect(getYearRange(new Date('2020-02-10'))).toEqual(['2020-01-01', '2020-12-30']);
    expect(getYearRange(new Date('2019-02-10'))).toEqual(['2019-01-01', '2019-12-30']);
  });

  it('generateCalendarData', () => {
    const data = [{ commit: 100, day: '2020-02-10' }];

    const result = [
      { day: '2020-02-08', $$day$$: 6, $$week$$: 6 },
      { day: '2020-02-09', $$day$$: 0, $$week$$: 7 },
      { day: '2020-02-10', $$day$$: 1, $$week$$: 7, commit: 100 },
      { day: '2020-02-11', $$day$$: 2, $$week$$: 7 },
      { day: '2020-02-12', $$day$$: 3, $$week$$: 7 },
    ];

    expect(generateCalendarData(data, ['2020-02-08', '2020-02-12'], 'day')).toEqual(result);
    expect(generateCalendarData(data, ['2020-02-12', '2020-02-08'], 'day')).toEqual(result);
  });
});
