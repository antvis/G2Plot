import { getTheme as g2GetTheme } from '../../dependents';
import { isString, deepMix, hasKey } from '@antv/util';
import { convertToG2Theme, getGlobalTheme, getTheme, applyTemplate } from '../../theme';
import { ViewConfig } from '../view-layer';

/**
 * 负责图表theme的管理
 */

const G2DefaultTheme = g2GetTheme();

export default class ThemeController<T extends ViewConfig = ViewConfig> {
  /**
   * 获取指定的全局theme
   * @param theme
   */
  public static getGlobalTheme(theme: string | object) {
    if (isString(theme)) {
      return getGlobalTheme(theme);
    }
    return deepMix({}, getGlobalTheme(), theme);
  }

  /**
   * 通过 theme 和图表类型，获取当前 plot 对应的主题
   * @param props
   * @param type
   */
  public getPlotTheme(props: T, type: string) {
    let theme;
    if (hasKey(props, 'template')) {
      theme = applyTemplate(props.template, props);
    } else {
      theme = props.theme;
    }
    if (isString(theme)) {
      return deepMix({}, getGlobalTheme(theme), getTheme(type));
    }
    return deepMix({}, getGlobalTheme(), getTheme(type), theme);
  }

  /**
   * 获取转化成 G2 的结构主题
   * @param props
   * @param type
   */
  public getTheme(props: T, type: string): any {
    const plotG2Theme = convertToG2Theme(this.getPlotTheme(props, type));
    const g2Theme = deepMix({}, G2DefaultTheme, plotG2Theme);
    return g2Theme;
  }
}
