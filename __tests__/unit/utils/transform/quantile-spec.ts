import { quantile, quantileSorted, quickselect, swap } from '../../../../src/utils/transform/quantile';

describe('quantile', () => {
  it('quantile-sorted', () => {
    expect(quantileSorted([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20], 0.5)).toBe(9);
  });

  it('quick-select', () => {
    const arr = [65, 28, 59, 33, 21, 56, 22, 95, 50, 12, 90, 53, 28, 77, 39];
    quickselect(arr, 8);
    expect(arr).toEqual([39, 28, 28, 33, 21, 12, 22, 50, 53, 56, 59, 65, 90, 77, 95]);
  });

  it('quantile', () => {
    expect(quantile([3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20], 0.5)).toBe(9); // => 9

    // from https://github.com/simple-statistics
    const even = [3, 6, 7, 8, 8, 10, 13, 15, 16, 20];
    expect(quantile(even, 0.25)).toBe(7);
    expect(quantile(even, 0.5)).toBe(9);
    expect(quantile(even, 0.75)).toBe(15);

    const odd = [3, 6, 7, 8, 8, 9, 10, 13, 15, 16, 20];
    expect(quantile(odd, 0.25)).toBe(7);
    expect(quantile(odd, 0.5)).toBe(9);
    expect(quantile(odd, 0.75)).toBe(15);
  });

  it('quantile: throw error', () => {
    const testEmptyArray = () => quantile([], 0.5);
    expect(testEmptyArray).toThrowError();

    const testBadBounds = () => quantile([1, 2, 3], 1.1);
    expect(testBadBounds).toThrowError();
  });

  it('quantile: can get an array of quantiles on a small number of elements', () => {
    const input = [500, 468, 454, 469];
    expect(quantile(input, [0.25, 0.5, 0.75])).toEqual([461, 468.5, 484.5]);
    expect(quantile(input, [0.05, 0.25, 0.5, 0.75, 0.95])).toEqual([454, 461, 468.5, 484.5, 500]);
  });

  it('swap', () => {
    const arr = [1, 2, 3];
    swap(arr, 0, 2);
    expect(arr).toEqual([3, 2, 1]);
    swap(arr, 0, 2);
    expect(arr).toEqual([1, 2, 3]);
  });
});
