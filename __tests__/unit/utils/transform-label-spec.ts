import { transformLabel } from '../../../src/utils';

describe('transform label', () => {
  it('label', () => {
    expect(transformLabel(undefined)).not.toBeDefined();
    expect(transformLabel(null)).toBeNull();
    expect(transformLabel('null')).toBe('null');
    expect(transformLabel('')).toBe('');
    expect(transformLabel({ offset: 20 })).toEqual({ offset: 20 });
    expect(transformLabel({ offset: 20, content: '123' })).toEqual({ offset: 20, content: '123' });
    expect(transformLabel({ offset: 20, content: '123', formatter: '456' })).toEqual({
      offset: 20,
      content: '123',
      formatter: '456',
    });
    expect(transformLabel({ offset: 20, formatter: () => '456' }).content).toBeTruthy();
  });
});
