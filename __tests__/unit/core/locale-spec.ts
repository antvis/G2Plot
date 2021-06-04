import { GLOBAL, setGlobal } from '../../../src/core/global';
import { getLocale, registerLocale } from '../../../src/core/locale';
import { EN_US_LOCALE } from '../../../src/locales/en_US';
import { ZH_CN_LOCALE } from '../../../src/locales/zh_CN';

describe('locale', () => {
  it('getLocale', () => {
    // 单测环境，默认 中文
    expect(GLOBAL.locale).toBe('zh-CN');
    expect(getLocale('xxx').get('general')).toEqual(ZH_CN_LOCALE.general);

    expect(getLocale('en-US').get('general')).toEqual(EN_US_LOCALE.general);

    setGlobal({ locale: 'en-US' });
    expect(getLocale('xxx').get('general')).toEqual(EN_US_LOCALE.general);
  });

  it('registerLocale', () => {
    registerLocale('custom', {
      locale: 'custom',
      general: { increase: 'INCREASE', decrease: 'DECREASE', root: 'ROOT' },
      statistic: { total: '统计' },
      conversionTag: { label: '转化率' },
      waterfall: { total: '累计值' },
    });
    expect(getLocale('custom').get(['statistic', 'total'])).toBe('统计');
    // 找不到语言包，则使用全局语言包
    expect(getLocale('---').get('locale')).toBe('en-US');

    setGlobal({ locale: 'custom' });
    expect(getLocale('---').get('locale')).toBe('custom');
    expect(getLocale('---').get(['statistic', 'total'])).toBe('统计');
  });
});
