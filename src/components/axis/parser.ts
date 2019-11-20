import { DataPointType } from '@antv/g2/lib/interface';
import * as _ from '@antv/util';
import { ViewLayer } from '../..';
import { ViewConfig } from '../../base/view-layer';
import { IBaseAxis } from '../../interface/config';

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
  private localProps: IBaseAxis;
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
    this._isVisible('title') ? this._titleParser() : (this.config.title = null);

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
    const { grid: gridCfg } = this.localProps;
    const { style } = gridCfg;

    if (_.isFunction(style)) {
      // @see g2/component/src/axis/base:_renderGrid
      this.config.grid = (text: string, index: number, count: number) => {
        const cfg = style(text, index, count);
        return _.deepMix({}, _.get(this.themeConfig, `grid.style`), cfg);
      };
    } else if (style) {
      this.config.grid = style;
      this.applyThemeConfig('grid');
    }
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
    const { visible, style, text } = this.localProps.title;
    if (!visible) {
      this.config.showTitle = false;
    } else {
      this.config.showTitle = true;
      if (style) {
        titleConfig.textStyle = style;
      }
      titleConfig.textStyle = _.deepMix({}, _.get(this.config, 'title.style'), titleConfig.textStyle);

      if (text) {
        titleConfig.text = text;
      }
    }
    this.config.title = titleConfig;
  }

  private _isVisible(name: string) {
    if (this.localProps[name] && this.localProps[name].visible) {
      return true;
    }
    return false;
  }

  private applyThemeConfig(type: 'line' | 'grid' | 'tickLine') {
    this.config[type] = _.deepMix({}, _.get(this.themeConfig, `${type}.style`), this.config[type]);
  }
}
