import { DataPointType } from '@antv/g2/lib/interface';
import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import { ElementOption, ICatAxis, ITimeAxis, IValueAxis, Label } from '../../interface/config';
import { extractScale } from '../../util/scale';
import responsiveMethods from './apply-responsive';
import './apply-responsive/theme';
import './component/label/column-label';
import * as EventParser from './event';
import './theme';

interface ColumnStyle {
  opacity?: number;
  lineDash?: number[];
}

const G2_GEOM_MAP = {
  column: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'column',
};

export interface ColumnViewConfig extends ViewConfig {
  // 图形
  type?: 'rect' | 'triangle' | 'round';
  colorField?: string;
  // 百分比, 数值, 最小最大宽度
  columnSize?: number;
  maxWidth?: number;
  minWidth?: number;
  columnStyle?: ColumnStyle | ((...args: any[]) => ColumnStyle);
  xAxis?: ICatAxis | ITimeAxis;
  yAxis?: IValueAxis;
}

export interface ColumnLayerConfig extends ColumnViewConfig, LayerConfig {}

export default class BaseColumnLayer<T extends ColumnLayerConfig = ColumnLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
      xAxis: {
        visible: true,
        tickLine: {
          visible: false,
        },
        title: {
          visible: true,
        },
      },
      yAxis: {
        title: {
          visible: true,
        },
        label: {
          visible: true,
        },
        grid: {
          visible: true,
        },
      },
      tooltip: {
        visible: true,
        shared: false,
        crosshairs: {
          type: 'rect',
        },
      },
      label: {
        visible: false,
        position: 'bottom',
        adjustColor: true,
      },
      legend: {
        visible: true,
        position: 'top-left',
      },
    });
  }
  public column: any;
  public type: string = 'column';

  public getOptions(props: T) {
    const options = super.getOptions(props);
    // @ts-ignore
    const defaultOptions = this.constructor.getDefaultOptions();
    return _.deepMix({}, options, defaultOptions, props);
  }

  public beforeInit() {
    super.beforeInit();
    /** 响应式图形 */
    if (this.options.responsive && this.options.padding !== 'auto') {
      this.applyResponsive('preRender');
    }
  }

  public afterRender() {
    /** 响应式 */
    if (this.options.responsive && this.options.padding !== 'auto') {
      this.applyResponsive('afterRender');
    }
    super.afterRender();
  }

  protected geometryParser(dim, type) {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  protected scale() {
    const { options } = this;
    const scales = {};
    /** 配置x-scale */
    scales[options.xField] = {};
    if (_.has(options, 'xAxis')) {
      extractScale(scales[options.xField], options.xAxis);
    }
    /** 配置y-scale */
    scales[options.yField] = {};
    if (_.has(options, 'yAxis')) {
      extractScale(scales[options.yField], options.yAxis);
    }
    this.setConfig('scales', scales);
    super.scale();
  }

  protected coord() {}

  protected adjustColumn(column: ElementOption) {
    return;
  }

  protected addGeometry() {
    const { options } = this;
    const column = getGeom('interval', 'main', {
      positionFields: [options.xField, options.yField],
      plot: this,
    });
    if (options.label) {
      column.label = this.extractLabel();
    }
    this.adjustColumn(column);
    this.column = column;
    this.setConfig('element', column);
  }

  protected annotation() {}

  protected animation() {
    if (this.options.animation === false) {
      /** 关闭动画 */
      this.column.animate = false;
    }
  }

  protected parserEvents(eventParser) {
    super.parserEvents(EventParser);
  }

  protected extractLabel() {
    const label = this.options.label as Label;
    if (label && label.visible === false) {
      return false;
    }
    const labelConfig = getComponent('label', {
      plot: this,
      labelType: 'columnLabel',
      fields: [this.options.yField],
      ...label,
    });
    return labelConfig;
  }

  private applyResponsive(stage) {
    const methods = responsiveMethods[stage];
    _.each(methods, (r) => {
      const responsive = r as DataPointType;
      responsive.method(this);
    });
  }
}

registerPlotType('column', BaseColumnLayer);
