import { version, adaptors } from '../../src';
import pkg from '../../package.json';

describe('index', () => {
  it('version', () => {
    expect(version).toBe(pkg.version);
  });

  it('export common adaptors', () => {
    expect(adaptors.scale).toBeDefined();
    expect(adaptors.tooltip).toBeDefined();
    expect(adaptors.legend).toBeDefined();
    expect(adaptors.animation).toBeDefined();
    expect(adaptors.interaction).toBeDefined();
    expect(adaptors.annotation).toBeDefined();
    expect(adaptors.theme).toBeDefined();
  });
});
