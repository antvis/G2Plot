import { transform } from '../../../src/utils/matrix';

describe('transform', () => {
  it('transform', () => {
    expect(transform([['t', 100, 100]])).toEqual([1, 0, 0, 0, 1, 0, 100, 100, 1]);
    expect(transform([['t', 100, 100]], [1, 0, 0, 0, 1, 1, 0, 0, 1])).toEqual([1, 0, 0, 100, 101, 1, 100, 100, 1]);
  });
});
