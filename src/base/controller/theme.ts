import { getTheme as g2GetTheme } from '../../dependents';
import { isString, deepMix } from '@antv/util';
// import Theme from '../../theme';
import { convertToG2Theme, getGlobalTheme, getTheme } from '../../theme';
import { processAxisVisible } from '../../util/axis';
import { getResponsiveTheme } from '../../util/responsive/theme';
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
    const { theme } = props;
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
    // this._processVisible(g2Theme);
    return g2Theme;
  }

  public getResponsiveTheme(type: string) {
    return getResponsiveTheme(type) || getResponsiveTheme('default');
  }

  private _processVisible(theme: any) {
    processAxisVisible(theme.axis.left);
    processAxisVisible(theme.axis.right);
    processAxisVisible(theme.axis.top);
    processAxisVisible(theme.axis.bottom);
    return theme;
  }
}
