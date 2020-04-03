import { getTheme, registerTheme, getGlobalTheme, registerGlobalTheme, convertToG2Theme } from '../../../src/theme';
import { DEFAULT_GLOBAL_THEME } from '../../../src/theme/default';

describe('theme', () => {
  it('export', function () {
    expect(getTheme).not.toBeUndefined();
    expect(registerTheme).not.toBeUndefined();
    expect(getGlobalTheme).not.toBeUndefined();
    expect(registerGlobalTheme).not.toBeUndefined();
    expect(convertToG2Theme).not.toBeUndefined();
  });

  it('getGlobalTheme', function () {
    expect(getGlobalTheme()).toEqual(DEFAULT_GLOBAL_THEME);
    expect(getGlobalTheme('not-defined')).toEqual(DEFAULT_GLOBAL_THEME);
  });

  it('registerGlobalTheme', function () {
    registerGlobalTheme('xxx', { a: 1 });

    expect(getGlobalTheme()).toEqual(DEFAULT_GLOBAL_THEME);
    expect(getGlobalTheme('xxx')).toEqual({ ...getGlobalTheme(), a: 1 });
  });

  it('registerTheme & getTheme', function () {
    registerTheme('test-pie', { b: 2 });

    // not exist
    expect(getTheme('test-circle')).toEqual({});
    expect(getTheme('test-pie')).toEqual({ b: 2 });
  });
});
