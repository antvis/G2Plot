import { flow } from '../../../src/utils';

describe('flow', () => {
  it('flow', () => {
    function square(n: number) {
      return n * n;
    }

    function plus(n: number) {
      return n + 1;
    }

    expect(flow(square, plus)(4)).toBe(17);
    expect(flow(plus, square)(4)).toBe(25);
  });
});
