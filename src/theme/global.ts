import { deepMix } from '@antv/util';
import { GLOBAL_LIGHT_THEME } from './global-light';
import { GLOBAL_DARK_THEME } from './global-dark';

/** 所有的全局主题 */
const GLOBAL_THEME_MAP: Record<string, any> = {
  'default-light': GLOBAL_LIGHT_THEME,
  'default-dark': GLOBAL_DARK_THEME,
};

/**
 * 注册全局主题
 * @param name
 * @param theme
 */
export function registerGlobalTheme(name: string, theme: any): void {
  const defaultTheme = getGlobalTheme();
  GLOBAL_THEME_MAP[name.toLowerCase()] = deepMix({}, defaultTheme, theme);
}

/**
 * 获取默认主题
 * @param name 如果 name 为空，则返回默认的主题，否则返回指定 name 的主题
 */
export function getGlobalTheme(name: string = 'default-light'): any {
  const theme = GLOBAL_THEME_MAP[name.toLowerCase()];
  if (theme) {
    return theme;
  }
  // 如没有找到，则使用当前全局主题替代
  console.warn("error in theme: Can't find the theme named %s. Please register theme first.", name);
  return GLOBAL_LIGHT_THEME;
}
