import { deepMix } from '@antv/util';
import { DEFAULT_GLOBAL_THEME } from './default';
import { DEFAULT_DARK_THEME } from './dark';

/** 所有的全局主题 */
const GLOBAL_THEME_MAP: Record<string, any> = {
  default: DEFAULT_GLOBAL_THEME,
  dark: DEFAULT_DARK_THEME,
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
export function getGlobalTheme(name: string = 'default'): any {
  const theme = GLOBAL_THEME_MAP[name.toLowerCase()];
  if (theme) {
    return theme;
  }
  // 如没有找到，则使用当前全局主题替代
  console.warn("error in theme: Can't find the theme named %s. Please register theme first.", name);
  return DEFAULT_GLOBAL_THEME;
}
