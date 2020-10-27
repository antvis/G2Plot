import { adjustYMetaByZero } from '../../../src/utils/data';

describe('data', () => {
  it('adjustYMetaByZero', () => {
    expect(adjustYMetaByZero([{ y: 0 }, { y: 1 }], 'y')).toEqual({});
    expect(adjustYMetaByZero([{ y: 20 }, { y: 20 }], 'y')).toEqual({ min: 0 });
    expect(adjustYMetaByZero([{ y: -20 }, { y: -20 }], 'y')).toEqual({ max: 0 });
  });
});
