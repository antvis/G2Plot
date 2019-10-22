import * as _ from '@antv/util';
import { DEFAULT_RESPONSIVE_THEME } from './default';

/**
 * 所有的响应式主题配置
 */
const RESPONSIVE_THEME_MAP = {
  default: DEFAULT_RESPONSIVE_THEME,
};

/**
 * 添加一个响应式主题配置
 * @param name
 * @param theme
 */
export function registerResponsiveTheme(name: string, theme) {
  RESPONSIVE_THEME_MAP[name.toLowerCase()] = _.deepMix({}, DEFAULT_RESPONSIVE_THEME, theme);
}

/**
 * 获取一个响应式主题配置，如果找不到则返回默认
 * @param name
 */
export function getResponsiveTheme(name: string) {
  const theme = RESPONSIVE_THEME_MAP[name.toLowerCase()];

  return theme ? theme : DEFAULT_RESPONSIVE_THEME;
}
