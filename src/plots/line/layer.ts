import { deepMix, has, map, each, get, some } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import { ICatAxis, ITimeAxis, IValueAxis, Label } from '../../interface/config';
import { extractScale, trySetScaleMinToZero } from '../../util/scale';
import { getPlotOption } from './animation/clipIn-with-data';
import responsiveMethods from './apply-responsive';
import LineLabel from './component/label/line-label';
import * as EventParser from './event';
import MarkerPoint, { MarkerPointCfg } from '../../components/marker-point';
import './theme';
import './apply-responsive/theme';
import { LooseMap } from '../../interface/types';
import { LineActive, LineSelect } from './interaction/index';

export interface LineStyle {
  stroke?: string;
  opacity?: number;
  lineDash?: number[];
  lineJoin?: 'bevel' | 'round' | 'miter';
  lineCap?: 'butt' | 'round' | 'square';
}

export interface PointStyle {
  lineDash?: number[];
  lineWidth?: number;
  opacity?: string;
  fill?: string;
  stroke?: string;
}

type IObject = LooseMap;

const GEOM_MAP = {
  line: 'line',
  point: 'point',
};

export interface LineViewConfig extends ViewConfig {
  /** 分组字段 */
  seriesField?: string;
  /** 是否平滑 */
  smooth?: boolean;
  /** 是否连接空数据 */
  connectNulls?: boolean;
  /** 折线extra图形样式 */
  lineStyle?: LineStyle | ((...args: any[]) => LineStyle);
  /** 折线数据点图形样式 */
  point?: {
    visible?: boolean;
    shape?: string;
    size?: number;
    color?: string;
    style?: PointStyle;
  };
  markerPoints?: (Omit<MarkerPointCfg, 'view'> & {
    visible?: boolean;
  })[];
  xAxis?: IValueAxis | ICatAxis | ITimeAxis;
  yAxis?: IValueAxis;
}

export interface LineLayerConfig extends LineViewConfig, LayerConfig {}

export default class LineLayer<T extends LineLayerConfig = LineLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): Partial<LineLayerConfig> {
    return deepMix({}, super.getDefaultOptions(), {
      connectNulls: false,
      smooth: false,
      lineSize: 2,
      lineStyle: {
        lineJoin: 'round',
        lineCap: 'round',
      },
      point: {
        visible: false,
        size: 3,
        shape: 'circle',
        style: {
          stroke: '#fff',
        },
      },
      label: {
        visible: false,
        type: 'point',
      },
      legend: {
        visible: true,
        position: 'top-left',
        wordSpacing: 4,
      },
      tooltip: {
        crosshairs: {
          line: {
            style: {
              stroke: 'rgba(0,0,0,0.45)',
            },
          },
        },
      },
      markerPoints: [],
    });
  }

  public line: any; // 保存line和point的配置项，用于后续的label、tooltip
  public point: any;
  public type: string = 'line';
  protected markerPoints: MarkerPoint[] = [];

  public afterRender() {
    const options = this.options;
    if (options.label && options.label.visible && options.label.type === 'line') {
      const label = new LineLabel({
        view: this.view,
        plot: this,
        ...this.options.label,
      });
      label.render();
    }
    if (options.markerPoints) {
      // 清空
      each(this.markerPoints, (markerPoint: MarkerPoint) => markerPoint.destroy());
      this.markerPoints = [];
      options.markerPoints.forEach((markerPointOpt) => {
        if (markerPointOpt.visible) {
          const markerPoint = new MarkerPoint({
            ...markerPointOpt,
            view: this.view,
          });
          this.markerPoints.push(markerPoint);
        }
      });
    }
    // 响应式
    if (options.responsive && options.padding !== 'auto') {
      this.applyResponsive('afterRender');
    }
    super.afterRender();
  }

  protected geometryParser(dim, type) {
    return GEOM_MAP[type];
  }

  protected scale() {
    const props = this.options;
    const scales = {};
    /** 配置x-scale */
    scales[props.xField] = {};
    if (has(props, 'xAxis')) {
      extractScale(scales[props.xField], props.xAxis);
    }
    /** 配置y-scale */
    scales[props.yField] = {};
    if (has(props, 'yAxis')) {
      extractScale(scales[props.yField], props.yAxis);
    }
    this.setConfig('scales', scales);
    trySetScaleMinToZero(
      scales[props.yField],
      map(props.data as any, (item) => item[props.yField])
    );
    super.scale();
  }

  protected coord() {}

  protected addGeometry() {
    // 配置线
    this.addLine();
    // 配置数据点
    this.addPoint();
  }

  private addLine() {
    const props: any = this.options;
    this.line = getGeom('line', 'main', {
      plot: this,
    });

    if (props.label) {
      this.label();
    }

    if (props.tooltip && (props.tooltip.fields || props.tooltip.formatter)) {
      this.geometryTooltip();
    }

    this.setConfig('geometry', this.line);
  }

  protected addPoint() {
    const props = this.options;
    const defaultConfig = { visible: false };
    if (props.point) {
      props.point = deepMix(defaultConfig, props.point);
    }
    if (props.point && props.point.visible) {
      this.point = getGeom('point', 'guide', {
        plot: this,
      });
      this.setConfig('geometry', this.point);
    }
  }

  protected label() {
    const props = this.options;
    const label = props.label as Label;

    if (label.visible === false || this.singleLineLabelCheck()) {
      this.line.label = false;
      return;
    }

    /** label类型为point时，使用g2默认label */
    if (label.type === 'point') {
      this.line.label = getComponent('label', {
        plot: this,
        top: true,
        labelType: label.type,
        fields: [props.yField],
        ...label,
      });
    }
  }

  protected geometryTooltip() {
    this.line.tooltip = {};
    const tooltipOptions: any = this.options.tooltip;
    if (tooltipOptions.fields) {
      this.line.tooltip.fields = tooltipOptions.fields;
    }
    if (tooltipOptions.formatter) {
      this.line.tooltip.callback = tooltipOptions.formatter;
      if (!tooltipOptions.fields) {
        this.line.tooltip.fields = [this.options.xField, this.options.yField];
        if (this.options.seriesField) {
          this.line.tooltip.fields.push(this.options.seriesField);
        }
      }
    }
  }

  protected animation() {
    super.animation();
    const props = this.options;
    if (props.animation === false) {
      // 关闭动画
      this.line.animate = false;
      if (this.point) this.point.animate = false;
    } else if (has(props, 'animation')) {
      // 根据动画类型区分图形动画和群组动画
      if (props.animation.type === 'clipingWithData' && props.padding !== 'auto') {
        getPlotOption({
          options: this.options,
          view: this.view,
        });
        this.line.animate = {
          appear: {
            animation: 'clipingWithData',
            easing: 'easeLinear',
            duration: 10000,
            options: {
              test: true,
            },
            yField: props.yField,
            seriesField: props.seriesField,
            plot: this,
          },
        };
        // 如果有数据点的话要追加数据点的动画
        if (props.point && props.point.visible) {
          this.point.animate = false;
        }
      }
    }
  }

  protected applyInteractions() {
    super.applyInteractions();
    this.interactions.push(
      new LineActive({
        view: this.view,
      })
    );
    this.interactions.push(
      new LineSelect({
        view: this.view,
      })
    );
  }

  protected parseEvents(eventParser) {
    super.parseEvents(EventParser);
  }

  private applyResponsive(stage) {
    const methods = responsiveMethods[stage];
    each(methods, (r) => {
      const responsive = r as IObject;
      responsive.method(this);
    });
  }

  private singleLineLabelCheck() {
    // 不允许单折线设置尾部跟随label
    return !this.options.seriesField && this.options.label.type && this.options.label.type === 'line';
  }
}

registerPlotType('line', LineLayer);
