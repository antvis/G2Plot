import { version } from '../../src';

describe('index', () => {
  it('version', () => {
    expect(version).toBe('2.0.0');
  });
});
