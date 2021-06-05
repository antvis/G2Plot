import { get } from '@antv/util';
import { Locale } from '../types/locale';
import { template } from '../utils';
import { GLOBAL } from './global';

const LocaleMap = {};

/**
 * register a locale
 * @param locale
 * @param localeObj
 */
export function registerLocale(locale: string, localeObj: Locale) {
  LocaleMap[locale] = localeObj;
}

/**
 * get locale of specific language
 * @param lang
 * @returns
 */
export function getLocale(locale: string) {
  return {
    get: (key: string | string[], obj?: Record<string, any>) => {
      return template(
        get(LocaleMap[locale], key) || get(LocaleMap[GLOBAL.locale], key) || get(LocaleMap['en-US'], key) || key,
        obj
      );
    },
  };
}
