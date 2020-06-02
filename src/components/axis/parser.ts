import { deepMix, isFunction, get } from '@antv/util';
import { ViewLayer } from '../..';
import { IBaseAxis } from '../../interface/config';
import { combineFormatter, getNoopFormatter, getPrecisionFormatter, getSuffixFormatter } from '../../util/formatter';

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
  protected originConfig: any;
  private plot: any;
  private dim: string;
  private localProps: IBaseAxis;
  private themeConfig: any;

  constructor(cfg: AxisConfig) {
    this.plot = cfg.plot;
    this.dim = cfg.dim;
    this.init();
  }

  private init() {
    this.config = false;
    this.themeConfig = this.getThemeConfig();
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
    const config = deepMix({}, this.themeConfig, propsConfig);
    this.localProps = config;
    if (config.visible) {
      return true;
    }
    return false;
  }

  private _lineParser() {
    this.config.line = this.localProps.line;
    if (this.localProps.line.style) {
      this.config.line = { style: this.localProps.line.style };
    }
    this.applyThemeConfig('line');
  }

  private _gridParser() {
    const style = this.localProps.grid?.line?.style;
    const type = this.localProps.grid?.line?.type;
    const alternateColor = this.localProps.grid?.alternateColor;

    if (isFunction(style)) {
      this.config.grid = (text: string, index: number, count: number) => {
        const cfg = style(text, index, count);
        return {
          line: {
            type,
            style: deepMix({}, get(this.themeConfig, `grid.line.style`), cfg),
          },
          alternateColor,
        };
      };
    } else if (style) {
      this.config.grid = {
        line: {
          type,
          style,
        },
        alternateColor,
      };
      this.applyThemeConfig('grid');
    }
  }

  private _tickLineParser() {
    this.config.tickLine = this.localProps.tickLine;
    if (this.localProps.tickLine.style) {
      this.config.tickLine = { style: this.localProps.tickLine.style };
    }
    this.applyThemeConfig('tickLine');
  }

  private _labelParser() {
    const { style, ...restLabelProps } = this.localProps.label;
    const labelConfig: any = { ...restLabelProps };
    if (style) {
      labelConfig.style = { ...this.localProps.label.style };
    }
    labelConfig.style = deepMix({}, get(this.themeConfig, 'label.style'), labelConfig.style);
    const formatter = this.parseFormatter(labelConfig);
    labelConfig.formatter = formatter;
    this.config.label = labelConfig;
  }

  private _titleParser() {
    const titleConfig: any = { ...this.localProps.title };
    const { visible, style, text } = this.localProps.title;
    if (!visible) {
      this.config.showTitle = false;
    } else {
      this.config.showTitle = true;
      if (style) {
        titleConfig.style = style;
      }
      titleConfig.style = deepMix({}, get(this.config, 'title.style'), titleConfig.textStyle);

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
    this.config[type] = deepMix({}, get(this.themeConfig, `${type}.style`), this.config[type]);
  }

  private getThemeConfig() {
    const theme = this.plot.getPlotTheme();
    let axisConfig;
    if (this.dim === 'x') {
      const xAxisOption = this.plot.xAxis;
      axisConfig = xAxisOption?.type ? theme.xAxis[xAxisOption.type] : theme.xAxis.base;
    } else if (this.dim === 'y') {
      const yAxisOption = this.plot.yAxis;
      axisConfig = yAxisOption?.type ? theme.xAxis[yAxisOption.type] : theme.yAxis.base;
    }
    return axisConfig;
  }

  protected parseFormatter(labelConfig) {
    let formatter = combineFormatter(
      getNoopFormatter(),
      getPrecisionFormatter(labelConfig.precision),
      getSuffixFormatter(labelConfig.suffix)
    );
    if (labelConfig.formatter) {
      formatter = combineFormatter(
        formatter,
        labelConfig.formatter as (text: string, item: any, idx: number) => string
      );
    }
    return formatter;
  }
}
