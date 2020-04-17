import { deepMix, has, map, each, some } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getGeom } from '../../geoms/factory';
import {
  ICatAxis,
  ITimeAxis,
  IValueAxis,
  GraphicStyle,
  LineStyle,
  ISliderInteractionConfig,
  IScrollbarInteractionConfig,
} from '../../interface/config';
import { extractScale, trySetScaleMinToZero } from '../../util/scale';
import { getPlotOption } from './animation/clipIn-with-data';
import responsiveMethods from './apply-responsive';
import '../../components/label/point';
import '../../components/label/point-auto';
import LineLabel from './component/label/line-label';
import * as EventParser from './event';
import MarkerPoint, { MarkerPointCfg } from '../../components/marker-point';
import './theme';
import './apply-responsive/theme';
import { LooseMap } from '../../interface/types';
import { LineActive, LineSelect } from './interaction/index';
import { getGeometryByType } from '../../util/view';

type IObject = LooseMap;

const GEOM_MAP = {
  line: 'line',
  point: 'point',
};

type LineInteraction =
  | { type: 'slider'; cfg: ISliderInteractionConfig }
  | { type: 'scrollBar'; cfg: IScrollbarInteractionConfig };

type PointShape = string | { fields?: []; callback: () => string };

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
    shape?: PointShape;
    size?: number;
    color?: string;
    style?: GraphicStyle;
  };
  markerPoints?: (Omit<MarkerPointCfg, 'view'> & {
    visible?: boolean;
  })[];
  xAxis?: IValueAxis | ICatAxis | ITimeAxis;
  yAxis?: IValueAxis;
  interactions?: LineInteraction[];
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
    this.renderLabel();
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

  protected coord() {
    return;
  }

  protected tooltip() {
    // 如果有标注点，则不展示markers
    if (some(this.options.markerPoints, (markerPointOpt) => markerPointOpt.visible)) {
      this.options.tooltip.showMarkers = false;
    }
    super.tooltip();
  }

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

  protected renderLabel() {
    const { scales } = this.config;
    const { label, yField } = this.options;
    const scale = scales[yField];
    if (label.visible) {
      const geometry = getGeometryByType(this.view, 'line');
      if (label.type === 'line') {
        // TODO: Line Label 迁移
        const label = new LineLabel({
          view: this.view,
          plot: this,
          ...this.options.label,
        });
        label.render();
      } else {
        this.doRenderLabel(geometry, {
          type: 'point',
          formatter: scale.formatter,
          ...this.options.label,
        });
      }
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
    if (!props.animation) {
      // 关闭动画
      this.line.animate = false;
      if (this.point) this.point.animate = false;
    } else {
      getPlotOption({
        options: this.options,
        view: this.view,
      });
      this.line.animate = props.animation;
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

  protected parseEvents() {
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
