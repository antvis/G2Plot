/**
 * Create By Bruce Too
 * On 2020-02-14
 */
import { deepMix, has } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import { extractScale } from '../../util/scale';
import * as EventParser from './event';
import { IValueAxis, ICatAxis, GraphicStyle, LineStyle } from '../../interface/config';
import './theme';

export interface RadarViewConfig extends ViewConfig {
  /** 角度字段 */
  angleField: string;
  /** 径向字段 */
  radiusField: string;
  /** 分组字段 */
  seriesField?: string;
  /** 是否平滑 */
  smooth?: boolean;
  /** 折线图形样式 */
  line?: {
    visible?: boolean;
    size?: number;
    color?: string;
    style?: LineStyle | ((...args: any[]) => LineStyle);
  };
  /** 数据点图形样式 */
  point?: {
    visible?: boolean;
    shape?: string;
    size?: number;
    color?: string;
    style?: GraphicStyle | ((...args: any[]) => GraphicStyle);
  };
  /** area图形样式 */
  area?: {
    visible?: boolean;
    style?: GraphicStyle | ((...args: any[]) => GraphicStyle);
  };
  /** 角度轴配置 */
  angleAxis?: ICatAxis;
  /** 径向轴配置 */
  radiusAxis?: IValueAxis;
  /** 雷达图半径 */
  radius?: number;
}

export interface RadarLayerConfig extends RadarViewConfig, LayerConfig {}

const GEOM_MAP = {
  area: 'area',
  line: 'line',
  point: 'point',
};

export default class RadarLayer extends ViewLayer<RadarLayerConfig> {
  public static getDefaultOptions(): any {
    return deepMix({}, super.getDefaultOptions(), {
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
      radius: 0.8,
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
          opacity: 0.25,
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
        autoRotateTitle: true,
        line: {
          visible: false,
        },
        tickLine: {
          visible: false,
        },
        grid: {
          visible: true,
          line: {
            style: {
              lineDash: [0, 0],
            },
          },
        },
        label: {
          visible: true,
          offset: 16,
          autoRotate: true,
          autoHide: true,
        },
        title: {
          visible: false,
        },
      },
      radiusAxis: {
        min: 0,
        visible: true,
        /** G2 4.0 默认 nice 不生效，需要手动添加 */
        nice: true,
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
          line: {
            style: {
              lineDash: [0, 0],
            },
          },
        },
        label: {
          visible: true,
          autoHide: true,
          autoRotate: true,
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
        showCrosshairs: false,
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

  public getAngleScale() {
    const { angleField } = this.options;
    return this.view.getScaleByField(angleField);
  }

  public getRadiusScale() {
    const { radiusField } = this.options;
    return this.view.getScaleByField(radiusField);
  }

  public getColorScale() {
    const { seriesField } = this.options;
    return this.view.getScaleByField(seriesField);
  }

  protected geometryParser(dim, type) {
    return GEOM_MAP[type];
  }

  protected scale() {
    const props = this.options;
    const scales = {};
    /** 配置x-scale */
    scales[props.angleField] = {};
    if (has(props, 'angleAxis')) {
      extractScale(scales[props.angleField], props.angleAxis);
    }
    /** 配置y-scale */
    scales[props.radiusField] = {};
    if (has(props, 'radiusAxis')) {
      extractScale(scales[props.radiusField], props.radiusAxis);
    }
    this.setConfig('scales', scales);
    super.scale();
  }

  protected coord() {
    const props = this.options;
    const coordConfig: any = {
      type: 'polar',
      cfg: {
        radius: props.radius,
      },
    };
    this.setConfig('coordinate', coordConfig);
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
    const axesConfig = {};
    axesConfig[props.angleField] = xAxis_parser;
    axesConfig[props.radiusField] = yAxis_parser;
    /** 存储坐标轴配置项到config */
    this.setConfig('axes', axesConfig);
  }

  protected addGeometry() {
    const props = this.options;
    /** 配置面积 */
    if (props.area.visible) {
      const area = getGeom('area', 'main', {
        plot: this,
      });
      this.setConfig('geometry', area);
      this.area = area;
    }
    /** 配置线 */
    if (props.line && props.line.visible) {
      const line = getGeom('line', 'main', {
        plot: this,
      });
      this.setConfig('geometry', line);
      this.line = line;
    }
    /** 配置点 */
    if (props.point && props.point.visible) {
      const point = getGeom('point', 'guide', {
        plot: this,
      });
      this.setConfig('geometry', point);
      this.point = point;
    }
    if (props.label) {
      this.label();
    }
    if (props.tooltip && (props.tooltip.fields || props.tooltip.formatter)) {
      this.geometryTooltip();
    }
  }

  protected geometryTooltip() {
    const geomConfig = this.line ? this.line : this.area;
    geomConfig.tooltip = {};
    const tooltipOptions: any = this.options.tooltip;
    if (tooltipOptions.fields) {
      geomConfig.tooltip.fields = tooltipOptions.fields;
    }
    if (tooltipOptions.formatter) {
      geomConfig.tooltip.callback = tooltipOptions.formatter;
      if (!tooltipOptions.fields) {
        geomConfig.tooltip.fields = [this.options.angleField, this.options.radiusField];
      }
      if (this.options.seriesField) {
        geomConfig.tooltip.fields.push(this.options.seriesField);
      }
    }
  }

  protected label() {
    const props = this.options;

    if (props.label.visible === false) {
      if (this.point) {
        this.point.label = false;
      }
      if (this.line) {
        this.line.label = false;
      }
      if (this.area) {
        this.area.label = false;
      }
      return;
    }

    // @Todo 雷达图标签布局算法后续补充
    const label = getComponent('label', {
      fields: [props.radiusField],
      cfg: {
        type: 'polar',
        autoRotate: false,
      },
      plot: this,
      ...props.label,
    });

    if (this.point) {
      this.point.label = label;
    } else if (this.line) {
      this.line.label = label;
    } else if (this.area) {
      this.area.label = label;
    }
  }

  protected annotation() {
    return;
  }

  protected animation() {
    super.animation();
    const props = this.options;
    if (props.animation === false) {
      // 关闭动画
      if (this.area) this.area.animate = false;
      if (this.line) this.line.animate = false;
      if (this.point) this.point.animate = false;
    }
  }

  protected parseEvents() {
    super.parseEvents(EventParser);
  }
}

registerPlotType('radar', RadarLayer);
