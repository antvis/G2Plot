import { omit } from '../../../src/utils';

describe('omit', () => {
  it('omit', () => {
    expect(omit(null, [])).toEqual({});
    expect(omit(undefined, [])).toEqual({});

    expect(omit({ a: 1, b: 2, c: undefined }, ['a'])).toEqual({ b: 2, c: undefined });
    expect(omit({ a: 1, b: 2, c: undefined }, ['a', 'd'])).toEqual({ b: 2, c: undefined });
    expect(omit({ a: 1, b: 2, c: undefined }, ['a', 'c', 'd'])).toEqual({ b: 2 });
  });
});
