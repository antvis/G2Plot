import { CoordinateType } from '@antv/g2/lib/plot/interface';
import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import { Label } from '../../interface/config';
import * as EventParser from '../column/event';
import { LineStyle } from '../line/layer';
import './component/label/rose-label';
import { getCentralAnnotation, Size, StatisticConfig } from './component/annotation/central-annotation';

interface RoseStyle extends LineStyle {
  stroke?: string;
  lineWidth?: number;
}

export interface RoseViewConfig extends ViewConfig {
  radiusField: string;
  categoryField: string;
  colorField?: string;
  stackField?: string;
  groupField?: string;
  radius?: number;
  innerRadius?: number;
  /** 每个扇形切片的样式 */
  sectorStyle?: RoseStyle | ((...args: any[]) => RoseStyle);
  label?: RoseLabel;
  /** 中心文本 统计量 */
  statistic?: StatisticConfig;
}

type RoseLabel = ViewConfig['label'] & {
  type: 'outer' | 'inner';
  /** 自动调整颜色 */
  adjustColor?: boolean;
  /** 自动旋转 */
  autoRotate?: boolean;
};

export interface RoseLayerConfig extends RoseViewConfig, LayerConfig {}

const G2_GEOM_MAP = {
  rose: 'interval',
};

const PLOT_GEOM_MAP = {
  rose: 'column',
};

export default class RoseLayer<T extends RoseLayerConfig = RoseLayerConfig> extends ViewLayer<T> {
  public static centralId = 0;
  private statistic: any; // 保存 statistic 实例用于响应交互

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
      radius: 0.8,
      innerRadius: 0,
      label: {
        visible: true,
        type: 'inner',
        autoRotate: true,
        adjustColor: false,
      },
      legend: {
        visible: true,
        position: 'bottom-center',
      },
      tooltip: {
        visible: true,
        shared: false,
        crosshairs: null,
      },
      columnStyle: {
        stroke: 'white',
        lineWidth: 1,
      },
      statistic: {
        visible: false,
        position: 'center',
        triggerOn: 'hover',
      },
      xAxis: {
        autoRotateLabel: true,
        line: {
          visible: false,
        },
        tickLine: {
          visible: false,
        },
        grid: {
          visible: true,
          style: {
            lineWidth: 0.5,
          },
        },
        label: {
          offset: 5,
        },
      },
      yAxis: {
        visible: false,
      },
    });
  }

  public rose: any;
  public type: string = 'rose';

  public getOptions(props: T) {
    const options = super.getOptions(props);
    // @ts-ignore
    const defaultOptions = this.constructor.getDefaultOptions();
    const columnStyle = props.sectorStyle;
    const xField = props.categoryField;
    const yField = props.radiusField;
    this.adjustStatisticOptions(options);
    return _.deepMix({}, options, defaultOptions, { columnStyle, xField, yField }, props);
  }

  public beforeInit() {
    super.beforeInit();
    RoseLayer.centralId++;
  }

  public afterInit() {
    super.afterInit();
    this.handleStatisticActive();
  }

  public afterRender() {
    super.afterRender();
    this.adjustStatisticPosition();
  }

  /** 调整指标卡位置 */
  private adjustStatisticPosition() {
    if (this.statistic) {
      const panelRange = this.view.get('panelRange');
      const coord = this.view.get('coord');
      const center = coord.getCenter();
      const dom: HTMLDivElement = document.querySelector(`.${this.statistic.classId}`);
      if (dom && dom.parentElement) {
        const size = this.getCentralSize(panelRange);
        dom.style.width = `${size.width}px`;
        dom.style.maxHeight = `${size.height}px`;
        const domRect = dom.getBoundingClientRect();
        dom.parentElement.style.top = `${center.y - domRect.height / 2}px`;
        dom.parentElement.style.left = `${center.x - domRect.width / 2}px`;
        this.statistic.html = dom.parentElement.innerHTML;
      }
    }
  }

  protected geometryParser(dim, type) {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected scale() {
    // super.scale();
    const props = this.options;
    const scales = {};
    scales[props.radiusField] = {};
    scales[props.categoryField] = { type: 'cat' };
    this.setConfig('scales', scales);
  }

  /** 不显示坐标轴 */
  protected axis() {
    super.axis();
    const options = this.options;
    if (!options.stackField && !options.groupField) {
      this.setConfig('axes', false);
    }
  }

  protected coord() {
    const props = this.options;
    const coordConfig = {
      type: 'polar' as CoordinateType,
      cfg: {
        radius: props.radius,
        innerRadius: props.innerRadius || 0,
      },
    };
    this.setConfig('coord', coordConfig);
  }

  protected addGeometry() {
    const options = this.options;
    this.adjustColorFieldMapping();
    this.adjustLegendOptions();
    const rose = getGeom('interval', 'main', {
      plot: this,
      positionFields: [options.categoryField, options.radiusField],
      widthRatio: 1,
    });
    rose.label = this.extractLabel();
    rose.adjust = this.adjustRoseAdjust();
    this.rose = rose;
    this.setConfig('element', rose);
  }

  protected adjustColorFieldMapping() {
    const options = this.options;
    if (options.stackField || options.groupField) {
      this.options.colorField = null;
    }
  }

  protected adjustRoseAdjust() {
    if (this.options.stackField) {
      return [
        {
          type: 'stack',
        },
      ];
    } else if (this.options.groupField) {
      return [
        {
          type: 'dodge',
          marginRatio: 0,
        },
      ];
    }
    return null;
  }

  protected animation() {
    super.animation();
    const props = this.options;
    if (props.animation === false) {
      /** 关闭动画 */
      this.rose.animate = false;
    }
  }

  protected annotation() {
    const options = this.options;
    const annotations = [];
    if (options.statistic && options.statistic.visible) {
      const statisticConfig = options.statistic;
      if (statisticConfig.position === 'center') {
        // 目前不支持其他位置的 annotation
        const size = this.getCentralSize({ width: this.width, height: this.height });
        const centralAnnotation = getCentralAnnotation(
          statisticConfig,
          `central-annotation-${RoseLayer.centralId}`,
          size
        );
        annotations.push(centralAnnotation);
        if (statisticConfig.triggerOn) {
          this.setConfig('tooltip', false);
        }
        this.statistic = _.deepMix({}, statisticConfig, centralAnnotation);
      }
    }
    this.setConfig('annotations', annotations);
  }

  protected parseEvents(eventParser) {
    super.parseEvents(EventParser);
  }

  protected extractLabel() {
    const options = this.options;
    if (!options.label || !options.label.visible) {
      return false;
    }
    const label = _.deepMix({}, options.label as Label);
    this.adjustLabelOptions(label);
    const fields = [options.categoryField, options.radiusField];
    if (options.stackField || options.groupField) {
      fields.push(options.stackField || options.groupField);
    }
    const labelConfig = getComponent('label', {
      plot: this,
      labelType: 'roseLabel',
      fields,
      ...label,
    });
    return labelConfig;
  }

  /** 处理 指标卡激活事件 */
  protected handleStatisticActive() {
    if (this.statistic) {
      /** 处理环图中心文本响应交互的问题 */
      if (this.statistic && this.statistic.triggerOn) {
        let triggerOnEvent = 'mouseenter';
        let triggerOffEvent = 'mouseleave';
        if (this.statistic.triggerOn === 'click') {
          triggerOnEvent = 'click';
          triggerOffEvent = 'dblclick';
        }
        const { radiusField, categoryField } = this.options;
        this.view.on(
          `interval:${triggerOnEvent}`,
          _.debounce((e) => {
            const statisticConfig = { ...this.options.statistic };
            /** 响应交互内容的优先级 高于 配置的优先级 */
            statisticConfig.content = this.parseStatisticContent(e.data._origin, categoryField, radiusField);
            const panelRange = this.view.get('panelRange');
            const centralAnnotation = getCentralAnnotation(
              statisticConfig,
              this.statistic.classId,
              this.getCentralSize(panelRange)
            );
            const dom: HTMLDivElement = document.querySelector(`.${centralAnnotation.classId}`);
            if (dom && dom.parentElement) {
              dom.parentElement.innerHTML = centralAnnotation.html;
            }
          }, 100)
        );
        this.view.on(
          `interval:${triggerOffEvent}`,
          _.debounce((e) => {
            // 还原
            const dom: HTMLDivElement = document.querySelector(`.${this.statistic.classId}`);
            if (dom && dom.parentElement) {
              dom.parentElement.innerHTML = this.statistic.html;
            }
          }, 100)
        );
      }
    }
  }

  private adjustLabelOptions(labelOptions: RoseLabel) {
    const { radiusField } = this.options;
    if (labelOptions) {
      const { offset, type, formatter } = labelOptions;
      if (type === 'inner') {
        labelOptions.offset = offset < 0 ? offset : -10;
      } else if (type === 'outer') {
        labelOptions.offset = offset >= 0 ? offset : 10;
      }
      if (!formatter) {
        // 默认显示 数值
        labelOptions.formatter = (text, item) => `${item._origin[radiusField]}`;
      }
    }
  }

  private adjustLegendOptions() {
    const options = this.options;
    const legendOptions = options.legend;
    if (legendOptions) {
      if (!options.stackField && !options.groupField) {
        legendOptions.clickable = false;
      }
    }
  }

  /** mutable */
  private adjustStatisticOptions(options: RoseLayerConfig) {
    const { radiusField, categoryField, statistic: statisticOptions } = options;
    const totalValue = this.getTotalValue(options);
    if (statisticOptions && !statisticOptions.content) {
      statisticOptions.content = this.parseStatisticContent(totalValue, categoryField, radiusField);
    }
  }

  /** 获取总计数据 */
  private getTotalValue(options: RoseLayerConfig): object {
    let total = 0;
    _.each(options.data, (item) => {
      if (typeof item[options.radiusField] === 'number') {
        total += item[options.radiusField];
      }
    });
    const data = {
      [options.radiusField]: total,
      [options.categoryField]: '总计',
    };
    return data;
  }

  private getCentralSize(box: Size): Size {
    const width = box.width * this.options.innerRadius;
    const height = box.height * this.options.innerRadius;
    const innerRadius = Math.min(width, height) / 2;
    return {
      width: 2 * Math.sqrt((innerRadius * innerRadius) / 2),
      height: 2 * Math.sqrt((innerRadius * innerRadius) / 2),
    };
  }

  private parseStatisticContent(data: any, xField: string, yField: string): StatisticConfig['content'] {
    return {
      name: data[xField],
      value: data[yField],
    };
  }
}

registerPlotType('rose', RoseLayer);
