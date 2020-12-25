import { isRealNumber } from '../../../src/utils/number';

describe('number', () => {
  it('isRealNumber', () => {
    expect(isRealNumber(null)).toBe(false);
    expect(isRealNumber(true)).toBe(false);
    expect(isRealNumber('a')).toBe(false);
    expect(isRealNumber(undefined)).toBe(false);

    expect(isRealNumber(1)).toBe(true);
    expect(isRealNumber(0)).toBe(true);
    expect(isRealNumber(0.00001)).toBe(true);
    expect(isRealNumber(-1)).toBe(true);
  });
});
