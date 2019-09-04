import { CoordinateType } from '@antv/g2/lib/plot/interface';
import * as _ from '@antv/util';
import { __assign } from 'tslib';
import BasePlot from '../../base/plot';
import { getGeom } from '../../geoms/factory';
import BaseConfig from '../../interface/config';
import { extractScale } from '../../util/scale';
import * as EventParser from './event';

interface LineStyle {
  opacity?: number;
  lineDash?: number[];
}

interface PointStyle {
  shape?: string;
  size?: number;
  color?: string;
  opacity?: string;
}

interface FillStyle {
  shape?: string;
  size?: number;
  color?: string;
  opacity?: string;
}

interface Point {
  [k: string]: any;
}

export interface RadarConfig extends BaseConfig {
  /** 分组字段 */
  seriesField?: string;
  /** 是否平滑 */
  smooth?: boolean;
  /** 折线图形样式 */
  line?: {
    visible?: boolean;
    style?: LineStyle;
  };
  /** 数据点图形样式 */
  point?: {
    visible: boolean;
    style?: PointStyle;
  };
  /** area图形样式 */
  area?: {
    visible: boolean;
    style?: FillStyle;
  };
  // fixme: any --> IValueAxis  | ICatAxis | ITimeAxis
  xAxis: any;
  // fixme: any --> IValueAxis
  yAxis: any;
  radius?: number;
  // fixme: any
  [attr: string]: any;
}

const GEOM_MAP = {
  area: 'area',
  line: 'line',
  point: 'point',
};

export default class Rardar extends BasePlot<RadarConfig> {
  public baseElement: any;
  public lineElement: any; // 保存line、area、point的配置项，用于后续的label、tooltip
  public pointElement: any;
  public areaElement: any;

  protected geometryParser(dim, type) {
    return GEOM_MAP[type];
  }

  protected setType() {
    this.type = 'rardar';
  }

  protected _setDefaultG2Config() {}

  protected _scale() {
    const props = this._initialProps;
    const scales = {};
    /** 配置x-scale */
    scales[props.xField] = {};
    if (_.has(props, 'xAxis')) {
      extractScale(scales[props.xField], props.xAxis);
    }
    /** 配置y-scale */
    scales[props.yField] = {};
    if (_.has(props, 'yAxis')) {
      extractScale(scales[props.yField], props.yAxis);
    }
    this._setConfig('scales', scales);
    super._scale();
  }

  protected _coord() {
    const props = this._initialProps;
    const coordConfig = {
      type: 'polar' as CoordinateType,
      cfg: {
        radius: 0.8, // default radius值
      },
    };
    if (_.has(props, 'radius')) {
      coordConfig.cfg.radius = props.radius;
    }
    this._setConfig('coord', coordConfig);
  }

  protected _axis() {
    const props = this._initialProps;
    const axesConfig = { fields: {} };
    /** 配置x轴 */
    if (props.xAxis && props.xAxis.visible === false) {
      axesConfig.fields[props.xField] = false;
    } else if (props.xAxis) {
      axesConfig.fields[props.xField] = {
        line: null,
        tickLine: null,
        grid: {
          lineDash: null,
        },
      };
      if (props.xAxis.style) {
        const styleCfg = this._axisStyleParser(props.xAxis.style, axesConfig.fields[props.xField]);
        axesConfig.fields[props.xField] = _.deepMix(axesConfig.fields[props.xField], styleCfg);
      }
      if (props.xAxis.formatter) {
        const formatter = props.xAxis.formatter;
        axesConfig.fields[props.xField].label = function(text, index, total) {
          const returnCfg = {
            text: formatter(text),
          } as Point;
          if (props.xAxis.style && props.xAxis.style.label) {
            returnCfg.textStyle = props.xAxis.style.label;
          }
          return returnCfg;
        };
      }
    }
    /** 配置y轴 */
    if (props.yAxis && props.yAxis.visible === false) {
      axesConfig.fields[props.yField] = false;
    } else if (props.yAxis) {
      axesConfig.fields[props.yField] = {
        line: null,
        tickLine: null,
        gridType: 'line',
        grid: {
          lineDash: null,
        },
        gridAlternateColor: 'rgba(0, 0, 0, 0.04)',
      };
      if (props.yAxis.style) {
        const styleCfg = this._axisStyleParser(props.yAxis.style, axesConfig.fields[props.yField]);
        axesConfig.fields[props.yField] = _.deepMix(axesConfig.fields[props.yField], styleCfg);
      }
      if (props.yAxis.formatter) {
        const formatter = props.yAxis.formatter;
        axesConfig.fields[props.yField].label = function(text, index, total) {
          const returnCfg = {
            text: formatter(text),
          } as Point;
          if (props.yAxis.style && props.yAxis.style.label) {
            returnCfg.textStyle = props.yAxis.style.label;
          }
          return returnCfg;
        };
      }
    }
    /** 存储坐标轴配置项到config */
    this._setConfig('axes', axesConfig);
  }

  protected _addElements() {
    const props = this._initialProps;
    /** 配置面积 */
    let areaConfig = { visible: true };
    if (props.area) {
      areaConfig = _.deepMix(areaConfig, props.area);
    }
    if (areaConfig.visible) {
      const area = getGeom('area', 'main', {
        plot: this,
      });
      this._setConfig('element', area);
    }
    /** 配置线 */
    const lineConfig = { visible: true };
    props.line = _.deepMix(lineConfig, props.line);
    if (props.line.visible) {
      const line = getGeom('line', 'guide', {
        plot: this,
      });
      this._setConfig('element', line);
    }
    /** 配置点 */
    let pointConfig = { visible: false };
    if (props.point) {
      pointConfig = _.assign(pointConfig, props.point);
    }
    if (pointConfig.visible) {
      const point = getGeom('point', 'guide', {
        plot: this,
      });
      this._setConfig('element', point);
    }
  }

  protected _label() {}

  protected _annotation() {}

  protected _animation() {}

  protected _interactions() {}

  protected _events(eventParser) {
    super._events(EventParser);
  }

  private _axisStyleParser(styleProps, axisConfig) {
    const styleCfg = {} as Point;
    if (styleProps.line) {
      if (axisConfig.line === null) {
        axisConfig.line = {};
      }
      styleCfg.line = styleProps.line;
    }
    if (styleProps.grid) {
      if (axisConfig.grid === null) {
        axisConfig.grid = {};
      }
      styleCfg.grid = styleProps.grid;
    }
    if (styleProps.title) {
      if (axisConfig.title === null) {
        axisConfig.title = {};
      }
      styleCfg.title = styleProps.title;
    }
    if (styleProps.tickLine) {
      if (axisConfig.tickLine === null) {
        axisConfig.tickLine = {};
      }
      styleCfg.tickLine = styleProps.tickLine;
    }
    if (styleProps.label) {
      if (axisConfig.label === null) {
        axisConfig.label = {};
      }
      styleCfg.label = {} as Point;
      styleCfg.label.textStyle = styleProps.label;
    }
    return styleCfg;
  }
}
