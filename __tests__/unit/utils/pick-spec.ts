import { pick } from '../../../src/utils';

describe('pick', () => {
  it('pick', () => {
    expect(pick(null, [])).toEqual({});
    expect(pick(undefined, [])).toEqual({});
    expect(pick(1, [])).toEqual({});

    expect(pick({ a: 1, b: 2, c: undefined }, ['a'])).toEqual({ a: 1 });
    expect(pick({ a: 1, b: 2, c: undefined }, ['a', 'd'])).toEqual({ a: 1 });
    expect(pick({ a: 1, b: 2, c: undefined }, ['a', 'c', 'd'])).toEqual({ a: 1 });
  });
});
