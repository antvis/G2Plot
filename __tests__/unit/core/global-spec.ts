import { GLOBAL, setGlobal } from '../../../src';

describe('global variables', () => {
  it('global locale', () => {
    // 单测环境，默认 中文
    expect(GLOBAL.locale).toBe('zh-CN');
  });

  it('setGlobal', () => {
    setGlobal({ locale: 'en-US' });
    expect(GLOBAL.locale).toBe('en-US');
  });
});
