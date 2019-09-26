import * as G2 from '@antv/g2';
import * as _ from '@antv/util';
import BaseConfig from '../../interface/config';
import Theme from '../../theme';
import { processAxisVisible } from '../../util/axis';
import { getResponsiveTheme } from '../../util/responsive/theme';

/**
 * 负责图表theme的管理
 */

const G2DefaultTheme = G2.Global.theme;

export default class ThemeController {
  public getPlotTheme<T extends BaseConfig = BaseConfig>(props: T, type: string) {
    let userPlotTheme = {};
    const propsTheme = props.theme;
    if (propsTheme) {
      // theme 以 name 的方式配置
      if (_.isString(propsTheme)) {
        userPlotTheme = Theme.getThemeByName(propsTheme).getPlotTheme(type);
      } else {
        userPlotTheme = props.theme;
      }
    }
    const globalTheme = Theme.getCurrentTheme();

    return _.deepMix({}, globalTheme.getPlotTheme(type), userPlotTheme);
  }

  public getTheme<T extends BaseConfig = BaseConfig>(props: T, type: string) {
    const plotG2Theme = Theme.convert2G2Theme(this.getPlotTheme(props, type));
    const g2Theme = _.deepMix({}, G2DefaultTheme, plotG2Theme);
    this._processVisible(g2Theme);
    return g2Theme;
  }

  public getResponsiveTheme(type: string) {
    return getResponsiveTheme(type) || getResponsiveTheme('default');
  }

  private _processVisible(theme) {
    processAxisVisible(theme.axis.left);
    processAxisVisible(theme.axis.right);
    processAxisVisible(theme.axis.top);
    processAxisVisible(theme.axis.bottom);
    return theme;
  }
}
