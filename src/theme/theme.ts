import { each, set, has, isEmpty } from '@antv/util';

/**
 * 所有的 plot theme object，每个图类型只会存在一个 theme
 */
const PLOT_THEME_MAP: Record<string, any> = {};

/**
 * 将 主题 转换为 G2 主题配置
 * @param type plotType
 */
// todo: 重复方法，只保留一个
function convertThemeToG2Theme(type: string, theme: any) {
  let styleMapShape: object = {
    lineStyle: 'line.line',
    columnStyle: 'interval.rect',
    pointStyle: 'point.circle', // point 可能是其他shape，如square等
  };
  const g2Theme = {} as any;
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
        set(geometryTheme, `${shapePath}.${[k === 'normal' ? 'default' : k]}.style`, v);
      });
    } else {
      set(g2Theme, styleKey, style);
    }
  });
  if (!isEmpty(geometryTheme)) {
    set(g2Theme, 'geometries', geometryTheme);
  }
  return g2Theme;
}

/**
 * 注册新的图表主题
 * @param type
 * @param theme
 */
export function registerTheme(type: string, theme: object) {
  PLOT_THEME_MAP[type.toLowerCase()] = convertThemeToG2Theme(type, theme);
}

/**
 * 根据类型获取主题
 * @param type plotType, such as line, column, bar, pie, bullet, radar and so on
 */
export function getTheme(type: string): any {
  return PLOT_THEME_MAP[type.toLowerCase()] || {};
}
