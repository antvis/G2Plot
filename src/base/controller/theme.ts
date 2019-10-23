import * as G2 from '@antv/g2';
import * as _ from '@antv/util';
import BaseConfig from '../../interface/config';
// import Theme from '../../theme';
import { convertToG2Theme, getGlobalTheme, getTheme } from '../../theme';
import { processAxisVisible } from '../../util/axis';
import { getResponsiveTheme } from '../../util/responsive/theme';

/**
 * 负责图表theme的管理
 */

const G2DefaultTheme = G2.Global.theme;

export default class ThemeController<T extends BaseConfig = BaseConfig> {
  /**
   * 通过 theme 和图表类型，获取当前 plot 对应的主题
   * @param props
   * @param type
   */
  public getPlotTheme(props: T, type: string) {
    const { theme } = props;

    // 用户配置了 theme 主题板，则从配套中选择，否则使用默认的配置 + theme
    const themeBase = _.isString(theme) ? getGlobalTheme(theme) : _.deepMix({}, getGlobalTheme(), theme);

    return _.deepMix({}, themeBase, getTheme(type));
  }

  /**
   * 获取转化成 G2 的结构主题
   * @param props
   * @param type
   */
  public getTheme(props: T, type: string): any {
    const plotG2Theme = convertToG2Theme(this.getPlotTheme(props, type));
    const g2Theme = _.deepMix({}, G2DefaultTheme, plotG2Theme);
    this._processVisible(g2Theme);
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
