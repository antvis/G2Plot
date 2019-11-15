import { DataPointType } from '@antv/g2/lib/interface';
import * as _ from '@antv/util';
import { ViewLayer } from '../..';

function propertyMapping(source, target, field) {
  if (source[field]) {
    target[field] = source[field];
  }
}

interface AxisConfig {
  plot: ViewLayer;
  dim: string;
}

export default class AxisParser {
  public config: any = false;
  private plot: any;
  private dim: string;
  private localProps: any;
  private themeConfig: any;

  constructor(cfg: AxisConfig) {
    this.plot = cfg.plot;
    this.dim = cfg.dim;
    this._init();
  }

  private _init() {
    this.config = false;
    const theme = this.plot.getPlotTheme();
    this.themeConfig = theme && theme.axis && theme.axis[this.dim];
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
    const propos = this.plot.options;
    const propsConfig = propos[`${this.dim}Axis`] ? propos[`${this.dim}Axis`] : {};
    const config = _.deepMix({}, this.themeConfig, propsConfig);
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
    this.applyThemeConfig('line');
  }

  private _gridParser() {
    this.config.grid = this.localProps.grid;
    if (this.localProps.grid.style) {
      this.config.grid = this.localProps.grid.style;
    }
    this.applyThemeConfig('grid');
  }

  private _tickLineParser() {
    this.config.tickLine = this.localProps.tickLine;
    if (this.localProps.tickLine.style) {
      this.config.tickLine = this.localProps.tickLine.style;
    }
    this.applyThemeConfig('tickLine');
  }

  private _labelParser() {
    const { formatter, style, ...restLabelProps } = this.localProps.label;
    const labelConfig: DataPointType = { ...restLabelProps };
    /** label style */
    if (style) {
      labelConfig.textStyle = this.localProps.label.style;
    }
    labelConfig.textStyle = _.deepMix({}, _.get(this.themeConfig, 'label.style'), labelConfig.textStyle);
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
    titleConfig.textStyle = _.deepMix({}, _.get(this.config, 'title.style'), titleConfig.textStyle);

    if (this.localProps.title.text) {
      titleConfig.text = this.localProps.title.text;
    }

    this.config.title = titleConfig;
  }

  private _isVisible(name: string) {
    if (this.localProps[name] && this.localProps[name].visible) {
      return true;
    } else if (_.isFunction(this.localProps[name])) {
      return true;
    }
    return false;
  }

  private applyThemeConfig(type: 'line' | 'grid' | 'tickLine') {
    this.config[type] = _.deepMix({}, _.get(this.themeConfig, `${type}.style`), this.config[type]);
  }
}
