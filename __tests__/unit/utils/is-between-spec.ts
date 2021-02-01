import { isBetween } from '../../../src/utils';

describe('isBetween', () => {
  it('isBetween', () => {
    expect(isBetween(2, 1, 3)).toBeTruthy();
    expect(isBetween(2, 3, 1)).toBeTruthy();
    expect(isBetween(1, 3, 1)).toBeTruthy();
    expect(isBetween(3, 3, 1)).toBeTruthy();
    expect(isBetween(0, 3, 1)).toBeFalsy();
    expect(isBetween(5, 3, 1)).toBeFalsy();
  });
});
