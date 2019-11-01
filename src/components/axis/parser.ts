import { DataPointType } from '@antv/g2/lib/interface';
import * as _ from '@antv/util';

function propertyMapping(source, target, field) {
  if (source[field]) {
    target[field] = source[field];
  }
}

export default class AxisParser {
  public config: any;
  private plot: any;
  private dim: string;
  private localProps: any;

  constructor(cfg) {
    _.assign(this, cfg);
    this._init();
  }

  private _init() {
    this.config = false;
    if (this._needDraw()) {
      this._styleParser();
    }
  }

  private _styleParser() {
    this.config = { ...this.localProps };
    this._isVisible('line') ? this._lineParser() : (this.config.line = null);
    this._isVisible('grid') ? this._gridParser() : (this.config.grid = null);
    this._isVisible('tickLine') ? this._tickLineParser() : (this.config.tickLine = null);
    this._isVisible('label') ? this._labelParser() : (this.config.label = null);
    if (this.localProps.title) {
      this._titleParser();
    }
    propertyMapping(this.localProps, this.config, 'autoHideLabel');
    propertyMapping(this.localProps, this.config, 'autoRotateLabel');
    propertyMapping(this.localProps, this.config, 'autoRotateTitle');
  }

  private _needDraw() {
    /** 如果在图表配置项里没有设置坐标轴整体的visibility则去对应的theme取 */
    const propos = this.plot.initialProps;
    const theme = this.plot.plotTheme;
    const propsConfig = propos[`${this.dim}Axis`] ? propos[`${this.dim}Axis`] : {};
    const themeConfig = theme.axis[this.dim];
    const config = _.deepMix({}, themeConfig, propsConfig);
    this.localProps = config;
    if (config.visible) {
      return true;
    }
    return false;
  }

  private _lineParser() {
    this.config.line = this.localProps.line;
    if (this.localProps.line.style) {
      this.config.line = this.localProps.line.style;
    }
  }

  private _gridParser() {
    this.config.grid = this.localProps.grid;
    if (this.localProps.grid.style) {
      this.config.grid = this.localProps.grid.style;
    }
  }

  private _tickLineParser() {
    this.config.tickLine = this.localProps.tickLine;
    if (this.localProps.tickLine.style) {
      this.config.tickLine = this.localProps.tickLine.style;
    }
  }

  private _labelParser() {
    const { formatter, style, ...restLabelProps } = this.localProps.label;
    const labelConfig: DataPointType = { ...restLabelProps };
    /** label style */
    if (style) {
      labelConfig.textStyle = this.localProps.label.style;
    }
    /** label formatter */
    if (formatter) {
      const textFormatter = this.localProps.label.formatter;
      this.config.label = (text) => {
        labelConfig.text = textFormatter(text);
        return labelConfig;
      };
    } else {
      this.config.label = labelConfig;
    }
  }

  private _titleParser() {
    const titleConfig: DataPointType = { ...this.localProps.title };

    if (!this.localProps.title.visible) {
      this.config.showTitle = false;
    } else {
      this.config.showTitle = true;
    }

    if (this.localProps.title.style) {
      titleConfig.textStyle = this.localProps.title.style;
    }

    if (this.localProps.title.text) {
      titleConfig.text = this.localProps.title.text;
    }

    this.config.title = titleConfig;
  }

  private _isVisible(name) {
    if (this.localProps[name] && this.localProps[name].visible) {
      return true;
    } else if (_.isFunction(this.localProps[name])) {
      return true;
    }
    return false;
  }
}
