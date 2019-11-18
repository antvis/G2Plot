import { CoordinateType } from '@antv/g2/lib/plot/interface';
import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import { extractScale } from '../../util/scale';
import * as EventParser from './event';
import { PointStyle, LineStyle } from '../line/layer';

interface FillStyle {
  shape?: string;
  size?: number;
  color?: string;
  opacity?: string;
}

interface Point {
  [k: string]: any;
}

export interface RadarViewConfig extends ViewConfig {
  /** 分组字段 */
  seriesField?: string;
  /** 是否平滑 */
  smooth?: boolean;
  /** 折线图形样式 */
  line?: {
    visible?: boolean;
    size: number;
    color: string;
    style?: LineStyle;
  };
  /** 数据点图形样式 */
  point?: {
    visible?: boolean;
    shape?: string;
    size?: number;
    color?: string;
    style?: PointStyle;
  };
  /** area图形样式 */
  area?: {
    visible: boolean;
    style?: FillStyle;
  };
  // fixme: any --> IValueAxis  | ICatAxis | ITimeAxis
  angleAxis: any;
  // fixme: any --> IValueAxis
  radiusAxis: any;
  radius?: number;
  // fixme: any
  [attr: string]: any;
}

export interface RadarLayerConfig extends RadarViewConfig, LayerConfig {}

const GEOM_MAP = {
  area: 'area',
  line: 'line',
  point: 'point',
};

export default class RadarLayer extends ViewLayer<RadarLayerConfig> {
  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
      width: 400,
      height: 400,
      title: {
        visible: false,
      },
      description: {
        visible: false,
      },
      forceFit: true,
      padding: 'auto',
      radius: 0.6,
      smooth: false,
      line: {
        visible: true,
        size: 2,
        style: {
          opacity: 1,
        },
      },
      area: {
        visible: true,
        style: {
          fillOpacity: 0.4,
        },
      },
      point: {
        visible: false,
        size: 4,
        shape: 'point',
        style: {
          opacity: 1,
        },
      },
      angleAxis: {
        visible: true,
        autoHideLabel: false,
        autoRotateLabel: true,
        autoRotateTitle: true,
        line: {
          visible: false,
        },
        tickLine: {
          visible: false,
        },
        grid: {
          visible: true,
          style: {
            lineDash: [0, 0],
          },
        },
        label: {
          visible: true,
          offset: 8,
          textStyle: {
            fill: '#000',
            opacity: 0.65,
          },
        },
        title: {
          visible: false,
        },
      },
      radiusAxis: {
        min: 0,
        visible: true,
        autoHideLabel: false,
        autoRotateLabel: true,
        autoRotateTitle: true,
        line: {
          visible: true,
        },
        tickLine: {
          visible: true,
        },
        gridType: 'line',
        grid: {
          visible: true,
          style: {
            lineDash: [0, 0],
          },
        },
        label: {
          visible: true,
        },
        title: {
          visible: false,
        },
      },
      label: {
        visible: false,
        type: 'point',
      },
      legend: {
        visible: true,
        position: 'left-top',
      },
      tooltip: {
        visible: true,
        shared: true,
        crosshairs: null,
      },
    });
  }
  public type: string = 'radar';
  public line: any;
  public point: any;
  public area: any;
  public baseElement: any;
  public lineElement: any; // 保存line、area、point的配置项，用于后续的label、tooltip
  public pointElement: any;
  public areaElement: any;

  public init() {
    const props = this.options;
    props.xField = props.angleField;
    props.yField = props.radiusField;
    super.init();
  }

  public getOptions(props: RadarLayerConfig) {
    const options = super.getOptions(props);
    // @ts-ignore
    const defaultOptions = this.constructor.getDefaultOptions();
    return _.deepMix({}, options, defaultOptions, props);
  }

  protected geometryParser(dim, type) {
    return GEOM_MAP[type];
  }

  protected scale() {
    const props = this.options;
    const scales = {};
    /** 配置x-scale */
    scales[props.angleField] = {};
    if (_.has(props, 'angleAxis')) {
      extractScale(scales[props.angleField], props.angleAxis);
    }
    /** 配置y-scale */
    scales[props.radiusField] = {};
    if (_.has(props, 'radiusAxis')) {
      extractScale(scales[props.radiusField], props.radiusAxis);
    }
    this.setConfig('scales', scales);
    super.scale();
  }

  protected coord() {
    const props = this.options;
    const coordConfig = {
      type: 'polar' as CoordinateType,
      cfg: {
        radius: props.radius,
      },
    };
    this.setConfig('coord', coordConfig);
  }

  protected axis(): void {
    const props = this.options;
    const xAxis_parser = getComponent('axis', {
      plot: this,
      dim: 'angle',
    });
    const yAxis_parser = getComponent('axis', {
      plot: this,
      dim: 'radius',
    });
    const axesConfig = { fields: {} };
    axesConfig.fields[props.angleField] = xAxis_parser;
    axesConfig.fields[props.radiusField] = yAxis_parser;
    /** 存储坐标轴配置项到config */
    this.setConfig('axes', axesConfig);
  }

  /* protected _axis() {
      const props = this.initialProps;
      const axesConfig = { fields: {} };
      if (props.angleAxis.visible === false) {
        axesConfig.fields[props.angleField] = false;
      } else {
        if (props.angleAxis.style) {
          const styleCfg = this._axisStyleParser(props.angleAxis.style, axesConfig.fields[props.angleField]);
          axesConfig.fields[props.angleField] = _.deepMix(axesConfig.fields[props.angleField], styleCfg);
        }
        if (props.angleAxis.formatter) {
          const formatter = props.angleAxis.formatter;
          axesConfig.fields[props.angleField].label = function(text, index, total) {
            const returnCfg = {
              text: formatter(text),
            } as Point;
            if (props.angleAxis.style && props.angleAxis.style.label) {
              returnCfg.textStyle = props.angleAxis.style.label;
            }
            return returnCfg;
          };
        }
      }

      if (props.radiusAxis.visible === false) {
        axesConfig.fields[props.radiusField] = false;
      } else {
        if (props.radiusAxis.style) {
          const styleCfg = this._axisStyleParser(props.radiusAxis.style, axesConfig.fields[props.radiusField]);
          axesConfig.fields[props.radiusField] = _.deepMix(axesConfig.fields[props.radiusField], styleCfg);
        }
        if (props.radiusAxis.formatter) {
          const formatter = props.radiusAxis.formatter;
          axesConfig.fields[props.radiusField].label = function(text, index, total) {
            const returnCfg = {
              text: formatter(text),
            } as Point;
            if (props.radiusAxis.style && props.radiusAxis.style.label) {
              returnCfg.textStyle = props.radiusAxis.style.label;
            }
            return returnCfg;
          };
        }
      }
      this.setConfig('axes', axesConfig);
    }*/

  protected addGeometry() {
    const props = this.options;
    /** 配置面积 */
    if (props.area.visible) {
      const area = getGeom('area', 'main', {
        plot: this,
      });
      this.setConfig('element', area);
      this.area = area;
    }
    /** 配置线 */
    if (props.line && props.line.visible) {
      const line = getGeom('line', 'guide', {
        plot: this,
      });
      this.setConfig('element', line);
      this.line = line;
    }
    /** 配置点 */
    if (props.point && props.point.visible) {
      const point = getGeom('point', 'guide', {
        plot: this,
      });
      this.setConfig('element', point);
      this.point = point;
    }
  }

  protected label() {}

  protected annotation() {}

  protected animation() {
    const props = this.options;
    if (props.animation === false) {
      // 关闭动画
      if (this.area) this.area.animate = false;
      if (this.line) this.line.animate = false;
      if (this.point) this.point.animate = false;
    }
  }

  protected parserEvents(eventParser) {
    super.parserEvents(EventParser);
  }

  private axisStyleParser(styleProps, axisConfig) {
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

registerPlotType('radar', RadarLayer);
