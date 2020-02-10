import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import { ICatAxis, ITimeAxis, IValueAxis, Label } from '../../interface/config';
import { extractScale, trySetScaleMinToZero } from '../../util/scale';
//import './animation/clipIn-with-data';
import responsiveMethods from './apply-responsive';
import './apply-responsive/theme';
import './component/label/line-label';
import './component/label/point-label';
import * as EventParser from './event';
import { LineActive, LineSelect } from './interaction/index';
import './theme';
import { LooseMap } from '../../interface/types';

export interface LineStyle {
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
  xAxis?: IValueAxis | ICatAxis | ITimeAxis;
  yAxis?: IValueAxis;
}

export interface LineLayerConfig extends LineViewConfig, LayerConfig {}

export default class LineLayer<T extends LineLayerConfig = LineLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): Partial<LineLayerConfig> {
    return _.deepMix({}, super.getDefaultOptions(), {
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
    });
  }

  public line: any; // 保存line和point的配置项，用于后续的label、tooltip
  public point: any;
  public type: string = 'line';

  public getOptions(props: T) {
    const options = super.getOptions(props);
    // @ts-ignore
    const defaultOptions = this.constructor.getDefaultOptions();
    return _.deepMix({}, options, defaultOptions, props);
  }

  public afterRender() {
    const props = this.options;
    // 响应式
    if (props.responsive && props.padding !== 'auto') {
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
    if (_.has(props, 'xAxis')) {
      extractScale(scales[props.xField], props.xAxis);
    }
    /** 配置y-scale */
    scales[props.yField] = {};
    if (_.has(props, 'yAxis')) {
      extractScale(scales[props.yField], props.yAxis);
    }
    this.setConfig('scales', scales);
    trySetScaleMinToZero(
      scales[props.yField],
      _.map(props.data, (item) => item[props.yField])
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
    const props = this.options;
    this.line = getGeom('line', 'main', {
      plot: this,
    });

    if (props.label) {
      this.label();
    }
    this.setConfig('element', this.line);
  }

  protected addPoint() {
    const props = this.options;
    const defaultConfig = { visible: false };
    if (props.point) {
      props.point = _.deepMix(defaultConfig, props.point);
    }
    if (props.point && props.point.visible) {
      this.point = getGeom('point', 'guide', {
        plot: this,
      });
      this.point.active = false;
      this.setConfig('element', this.point);
    }
  }

  protected label() {
    const props = this.options;
    const label = props.label as Label;

    if (label.visible === false || this.singleLineLabelCheck()) {
      this.line.label = false;
      return;
    }

    /** label类型为line，即跟随在折线尾部时，设置offset为0 */
    if (label.type === 'line') {
      label.offset = 0;
    }

    this.line.label = getComponent('label', {
      plot: this,
      top: true,
      labelType: label.type,
      fields: label.type === 'line' ? [props.seriesField] : [props.yField],
      ...label,
    });
  }

  protected animation() {
    super.animation();
    /*const props = this.options;
    if (props.animation === false) {
      // 关闭动画
      this.line.animate = false;
      if (this.point) this.point.animate = false;
    } else if (_.has(props, 'animation')) {
      // 根据动画类型区分图形动画和群组动画
      if (props.animation.type === 'clipingWithData' && props.padding !== 'auto') {
        this.line.animate = {
          appear: {
            animation: 'clipingWithData',
            easing: 'easeLinear',
            duration: 10000,
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
    }*/
  }

  protected applyInteractions() {
    super.applyInteractions();
    // 加入默认交互
    const interactions = this.view.interactions;
    const lineActive = new LineActive({ view: this.view });
    interactions.lineActive = lineActive;
    const lineSelect = new LineSelect({ view: this.view });
    interactions.lineSelect = lineSelect;
  }

  protected parseEvents(eventParser) {
    super.parseEvents(EventParser);
  }

  private applyResponsive(stage) {
    const methods = responsiveMethods[stage];
    _.each(methods, (r) => {
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
