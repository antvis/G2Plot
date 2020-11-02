import { transform } from '../../../src/utils/matrix';

describe('transform', () => {
  it('transform', () => {
    expect(transform([['t', 100, 100]])).toEqual([1, 0, 0, 0, 1, 0, 100, 100, 1]);
  });
});
