import { expect } from 'chai';
import { getTheme, registerTheme, getGlobalTheme, registerGlobalTheme, convertToG2Theme } from '../../../src/theme';
import { DEFAULT_GLOBAL_THEME } from '../../../src/theme/default';

describe('theme', () => {
  it('export', function() {
    expect(getTheme).not.to.be.undefined;
    expect(registerTheme).not.to.be.undefined;
    expect(getGlobalTheme).not.to.be.undefined;
    expect(registerGlobalTheme).not.to.be.undefined;
    expect(convertToG2Theme).not.to.be.undefined;
  });

  it('getGlobalTheme', function() {
    expect(getGlobalTheme()).to.be.eql(DEFAULT_GLOBAL_THEME);
    expect(getGlobalTheme('not-defined')).to.be.eql(DEFAULT_GLOBAL_THEME);
  });

  it('registerGlobalTheme', function() {
    registerGlobalTheme('xxx', { a: 1 });

    expect(getGlobalTheme()).to.be.eql(DEFAULT_GLOBAL_THEME);
    expect(getGlobalTheme('xxx')).to.be.eql({ ...getGlobalTheme(), a: 1 });
  });

  it('registerTheme & getTheme', function() {
    registerTheme('test-pie', { b: 2 });

    // not exist
    expect(getTheme('test-circle')).to.be.eql(getGlobalTheme());
    expect(getTheme('test-pie')).to.be.eql({ ...getGlobalTheme(), b: 2 });
  });
});
