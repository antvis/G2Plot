import { version } from '../../src';
import pkg from '../../package.json';

describe('index', () => {
  it('version', () => {
    expect(version).toBe(pkg.version);
  });
});
