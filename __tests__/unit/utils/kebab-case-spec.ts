import { kebabCase } from '../../../src/utils';

describe('kebabCase', () => {
  it('kebabCase', () => {
    expect(kebabCase(null)).toEqual(null);
    expect(kebabCase('')).toEqual('');
    expect(kebabCase('AAA')).toEqual('a-a-a');

    expect(kebabCase('fontSize')).toEqual('font-size');
    expect(kebabCase('aBBB')).toEqual('a-b-b-b');
    expect(kebabCase('aBcDeFggggHHH')).toEqual('a-bc-de-fgggg-h-h-h');
  });
});
