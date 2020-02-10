import { generateCalendarData } from '../../../../src/plots/calendar/util';

describe('Calendar util', () => {
  it('generateCalendarData', () => {
    const data = [{ commit: 100, day: '2020-02-10' }];
    expect(generateCalendarData(data, ['2020-02-08', '2020-02-12'], 'day').length).toEqual(5);
    expect(generateCalendarData(data, ['2020-02-12', '2020-02-08'], 'day').length).toEqual(5);
  });
});
