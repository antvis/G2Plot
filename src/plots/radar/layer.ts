import { CoordinateType } from '@antv/g2/lib/plot/interface';
import * as _ from '@antv/util';
import ViewLayer from '../../base/view-layer';
import { getComponent } from '../../components/factory';
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

export interface RadarLayerConfig extends BaseConfig {
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
  angleAxis: any;
  // fixme: any --> IValueAxis
  radiusAxis: any;
  radius?: number;
  // fixme: any
  [attr: string]: any;
}

const GEOM_MAP = {
  area: 'area',
  line: 'line',
  point: 'point',
};

export default class RadarLayer extends ViewLayer<RadarLayerConfig> {
  public baseElement: any;
  public lineElement: any; // 保存line、area、point的配置项，用于后续的label、tooltip
  public pointElement: any;
  public areaElement: any;

  public getDefaultProps() {
    return {
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
      radius: 1,
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
          opacity: 0.8,
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
          visible: false,
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
      radiusAxis: {
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
        gridAlternateColor: 'rgba(0, 0, 0, 0.04)',
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
        position: 'bottom-center',
      },
      tooltip: {
        visible: true,
        shared: true,
        crosshairs: null,
      },
    };
  }

  protected geometryParser(dim, type) {
    return GEOM_MAP[type];
  }

  protected setType() {
    this.type = 'radar';
  }

  protected beforeInit() {
    super.beforeInit();
    const props = this.initialProps;
    props.xField = props.angleField;
    props.yField = props.radiusField;
  }

  protected _setDefaultG2Config() {}

  protected _scale() {
    const props = this.initialProps;
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
    super._scale();
  }

  protected _coord() {
    const props = this.initialProps;
    const coordConfig = {
      type: 'polar' as CoordinateType,
      cfg: {
        radius: props.radius,
      },
    };
    this.setConfig('coord', coordConfig);
  }

  protected _axis(): void {
    const props = this.initialProps;
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

  protected _addGeometry() {
    const props = this.initialProps;
    /** 配置面积 */
    if (props.area.visible) {
      const area = getGeom('area', 'main', {
        plot: this,
      });
      this.setConfig('element', area);
    }
    /** 配置线 */
    if (props.line.visible) {
      const line = getGeom('line', 'guide', {
        plot: this,
      });
      this.setConfig('element', line);
    }
    /** 配置点 */
    if (props.point.visible) {
      const point = getGeom('point', 'guide', {
        plot: this,
      });
      this.setConfig('element', point);
    }
  }

  protected _label() {}

  protected _annotation() {}

  protected _animation() {}

  protected _parserEvents(eventParser) {
    super._parserEvents(EventParser);
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
