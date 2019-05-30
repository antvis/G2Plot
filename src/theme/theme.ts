import * as G2 from '@antv/g2';
import * as _ from '@antv/util';

const G2_DEFAULT_THEME = G2.Global.theme;

const THEME_MAP = {};
let currentThemeName = 'default';

/**
 * 主题类
 * @param type
 */
export default class Theme {
  static setTheme(name: string) {
    currentThemeName = name;
  }
  static getCurrentTheme() {
    return THEME_MAP[currentThemeName.toLowerCase()];
  }
  public name: string;
  public globalTheme: any;
  public plotTheme: any;

  constructor(name: string) {
    this.name = name;
    this.plotTheme = {};
    THEME_MAP[name.toLowerCase()] = this;
  }

  public registerGlobalTheme(globalTheme: any) {
    this.globalTheme = _.deepMix({}, globalTheme);
  }

  public registerPlotTheme(type: string, theme: any) {
    this.plotTheme[type.toLowerCase()] = theme;
  }

  public getPlotTheme(type: string) {
    if (!this.plotTheme[type.toLowerCase()]) {
      return this.globalTheme;
    }

    return _.deepMix({}, this.globalTheme, this.plotTheme[type.toLowerCase()]);
  }
}
