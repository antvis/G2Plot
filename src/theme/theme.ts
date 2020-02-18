import { getGlobalTheme } from './global';

/**
 * 所有的 plot theme object，每个图类型只会存在一个 theme
 */
const PLOT_THEME_MAP: Record<string, any> = {};

/**
 * 注册新的图表主题
 * @param type
 * @param theme
 */
export function registerTheme(type: string, theme: object) {
  PLOT_THEME_MAP[type.toLowerCase()] = theme;
}

/**
 * 根据类型获取主题
 * @param type
 */
export function getTheme(type: string): any {
  return PLOT_THEME_MAP[type.toLowerCase()] || {};
}
