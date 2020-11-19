import { conversionTagformatter } from '../../../src/utils/conversion';

describe('conversionTagformatter', () => {
  it('conversionTagformatter', () => {
    expect(conversionTagformatter(0, 0)).toBe('0.00%');
    expect(conversionTagformatter(0, 1)).toBe('∞');
    expect(conversionTagformatter(1, 0)).toBe('-∞');
    expect(conversionTagformatter(10, 20)).toBe('200.00%');
    expect(conversionTagformatter(40, 20)).toBe('50.00%');

    expect(conversionTagformatter(null, 20)).toBe('-');
    expect(conversionTagformatter(20, null)).toBe('-');
    expect(conversionTagformatter(null, null)).toBe('-');
    expect(conversionTagformatter(undefined, 20)).toBe('-');
    expect(conversionTagformatter(20, undefined)).toBe('-');
    expect(conversionTagformatter(undefined, undefined)).toBe('-');

    // @ts-ignore
    expect(conversionTagformatter(false, 20)).toBe('-');
    // @ts-ignore
    expect(conversionTagformatter(20, 'wef')).toBe('-');
    // @ts-ignore
    expect(conversionTagformatter(30, {})).toBe('-');
  });
});
