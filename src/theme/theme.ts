import { each, set, has, isEmpty, deepMix } from '@antv/util';
import { G2PlotTheme, G2Theme } from './interface';

/**
 * 所有的 plot theme object，每个图类型只会存在一个 theme
 */
const PLOT_THEME_MAP: Record<string, G2Theme> = {};

/**
 * 将 主题 转换为 G2 主题配置
 * @param type plotType
 */
export function convertThemeToG2Theme(type: string/** plot style */, theme: G2PlotTheme): G2Theme {
  let styleMapShape: object = {
    lineStyle: 'line.line',
    columnStyle: 'interval.rect',
    pointStyle: 'point.circle', // point 可能是其他shape，如square等
  };
  let g2Theme = {};
  if (type === 'area') {
    styleMapShape = {
      areaStyle: 'area.area',
      lineStyle: 'area.line', // todo area-smooth怎么配置
      pointStyle: 'point.circle',
    };
  }
  const geometryTheme = {};
  each(theme, (style, styleKey) => {
    if (has(styleMapShape, styleKey)) {
      const shapePath = styleMapShape[styleKey];
      each(style, (v, k) => {
        set(geometryTheme, `${shapePath}.${[k === 'normal' ? 'default' : (k === 'disable' ? 'inactive' : k)]}.style`, v);
      });
    } else {
      g2Theme = deepMix({}, g2Theme, { [styleKey]: style });
    }
  });
  if (!isEmpty(geometryTheme)) {
    g2Theme = deepMix({}, g2Theme, { geometries: geometryTheme });
  }
  return g2Theme;
}

/**
 * 注册新的图表主题
 * @param type
 * @param theme
 */
export function registerTheme(type: string, theme: G2PlotTheme) {
  PLOT_THEME_MAP[type.toLowerCase()] = convertThemeToG2Theme(type, theme);
}

/**
 * 根据类型获取主题
 * @param type plotType, such as line, column, bar, pie, bullet, radar and so on
 */
export function getTheme(type: string): G2Theme {
  return PLOT_THEME_MAP[type.toLowerCase()] || {};
}
