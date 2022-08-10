import { conversionTagFormatter } from '../../../src/utils/conversion';

describe('conversionTagFormatter', () => {
  it('conversionTagFormatter', () => {
    expect(conversionTagFormatter(0, 0)).toBe('-');
    expect(conversionTagFormatter(0, 1)).toBe('∞');
    expect(conversionTagFormatter(1, 0)).toBe('0.00%');
    expect(conversionTagFormatter(10, 20)).toBe('200.00%');
    expect(conversionTagFormatter(40, 20)).toBe('50.00%');
    expect(conversionTagFormatter(40, 40)).toBe('100%');

    expect(conversionTagFormatter(null, 20)).toBe('-');
    expect(conversionTagFormatter(20, null)).toBe('-');
    expect(conversionTagFormatter(null, null)).toBe('-');
    expect(conversionTagFormatter(undefined, 20)).toBe('-');
    expect(conversionTagFormatter(20, undefined)).toBe('-');
    expect(conversionTagFormatter(undefined, undefined)).toBe('-');

    // @ts-ignore
    expect(conversionTagFormatter(false, 20)).toBe('-');
    // @ts-ignore
    expect(conversionTagFormatter(20, 'wef')).toBe('-');
    // @ts-ignore
    expect(conversionTagFormatter(30, {})).toBe('-');
  });
});
