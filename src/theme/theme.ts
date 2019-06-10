import * as _ from '@antv/util';

const THEME_MAP = {};
let currentThemeName = 'default';

function convert2G2Axis(axis) {
  if (axis.line && axis.line.style) {
    const lineStyle = axis.line.style;
    delete axis.line.style;
    _.mix(axis.line, lineStyle);
  }
  if (axis.tickLine) {
    const tickLineStyle = axis.tickLine.style;
    delete axis.tickLine.style;
    _.mix(axis.tickLine, tickLineStyle);
  }
  if (axis.grid) {
    const gridStyle = axis.grid.style;
    delete axis.grid.style;
    _.mix(axis.grid, gridStyle);
  }
  if (axis.label) {
    if (axis.label.style) {
      axis.label.textStyle = axis.label.style;
      delete axis.label.style;
    }
  }
  if (axis.title) {
    if (axis.title.style) {
      axis.title.textStyle = axis.title.style;
      delete axis.title.style;
    }
  }
}

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

  static convert2G2Theme(plotThemeCfg) {
    const g2Theme = _.clone(plotThemeCfg);
    if (g2Theme.axis) {
      if (g2Theme.axis.x) {
        convert2G2Axis(g2Theme.axis.x);
        g2Theme.axis.bottom = {};
        _.deepMix(g2Theme.axis.bottom, g2Theme.axis.x, { position: 'bottom' });
        g2Theme.axis.top = {};
        _.deepMix(g2Theme.axis.top, g2Theme.axis.x, { position: 'top' });
        delete g2Theme.axis['x'];
      }
      if (g2Theme.axis.y) {
        convert2G2Axis(g2Theme.axis.y);
        g2Theme.axis.left = {};
        _.deepMix(g2Theme.axis.left, g2Theme.axis.y, { position: 'left' });
        g2Theme.axis.right = {};
        _.deepMix(g2Theme.axis.right, g2Theme.axis.y, { position: 'right' });
        delete g2Theme.axis['y'];
      }
    }
    return g2Theme;
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
    const defaultTheme = THEME_MAP['default'];
    this.globalTheme = _.deepMix({}, defaultTheme.getGlobalTheme(), globalTheme);
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

  public getGlobalTheme() {
    return this.globalTheme;
  }

  public getG2Theme(type: string) {

  }
}
