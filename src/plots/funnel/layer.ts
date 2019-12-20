import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { getComponent } from '../../components/factory';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getGeom } from '../../geoms/factory';
import { ElementOption, DataItem } from '../../interface/config';
import { rgb2arr } from '../../util/color';
import './theme';
import './animation/funnel-scale-in-y';
import './animation/funnel-fade-out';

const G2_GEOM_MAP = {
  column: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'funnel',
};

export interface FunnelViewConfig extends ViewConfig {
  percentage?: {
    visible?: boolean;
    adjustColor?: boolean;
    style?: {};
    formatter?: (yValueTop: any, yValue: any) => string;
  };
}

export interface FunnelLayerConfig extends FunnelViewConfig, LayerConfig {}

export default class FunnelLayer<T extends FunnelLayerConfig = FunnelLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): Partial<FunnelViewConfig> {
    const cfg: Partial<FunnelViewConfig> = {
      label: {
        visible: true,
        offsetX: 16,
        labelLine: {
          lineWidth: 1,
          stroke: 'rgba(0, 0, 0, 0.25)',
        },
        formatter: (xValue, yValue) => `${xValue} ${yValue}`,
      },
      percentage: {
        visible: true,
        style: {
          fontSize: '12',
          textAlign: 'center',
        },
        formatter: (yValueTop, yValue) => ((100 * yValue) / yValueTop).toFixed(1) + ' %',
      },
      padding: 'auto',
      legend: {
        position: 'bottom-center',
      },
      tooltip: {
        visible: true,
        shared: true,
        showTitle: false,
        crosshairs: {
          type: 'cross',
          style: {
            strokeOpacity: 0,
          },
        },
      },
      animation: {
        duration: 800,
      },
    };
    return _.deepMix({}, super.getDefaultOptions(), cfg);
  }

  public funnel: any;
  public type: string = 'funnel';
  private yValueTop?: any;
  private shouldAdjustLegends: boolean = true;
  private shouldAdjustAnnotations: boolean = false;

  protected processData(data?: DataItem[]): DataItem[] | undefined {
    const { options: props } = this;
    if (data && data[0]) {
      this.yValueTop = data[0][props.yField];
    } else {
      this.yValueTop = undefined;
    }
    return super.processData(data);
  }

  protected coord() {
    const coordConfig = {
      actions: [['transpose'], ['scale', 1, -1]],
    };
    this.setConfig('coord', coordConfig);
  }

  protected axis(): void {
    this.setConfig('axes', false);
  }

  protected adjustFunnel(funnel: ElementOption) {
    const { options: props } = this;

    funnel.shape = {
      values: ['funnel'],
    };

    funnel.color = {
      fields: [props.xField],
      values: props.color && (Array.isArray(props.color) ? props.color : [props.color]),
    };

    funnel.adjust = [
      {
        type: 'symmetric',
      },
    ];
  }

  protected addGeometry() {
    const props = this.options;
    const funnel = getGeom('interval', 'main', {
      positionFields: [props.xField, props.yField],
      plot: this,
    });
    if (props.label) {
      funnel.label = this.extractLabel();
    }
    this.adjustFunnel(funnel);
    this.funnel = funnel;
    this.setConfig('element', funnel);
  }

  protected annotation() {
    const annotationConfigs = [];

    this.getData().forEach((datum, i) => {
      const percentageConfig = this.extractPercentage(datum);
      annotationConfigs.push(percentageConfig);
    });

    this.setConfig('annotations', annotationConfigs);
  }

  protected animation() {
    const props = this.options;
    if (props.animation === false) {
      /** 关闭动画 */
      this.funnel.animate = false;
    } else {
      const duration = _.get(props, 'animation.duration');
      setTimeout(() => {
        this.shouldAdjustAnnotations = true;
      }, duration);
      this.funnel.animate = {
        appear: {
          animation: 'funnelScaleInY',
          duration: duration / this.getData().length,
          callback: (shape) => {
            const annotation = this.view.annotation().annotations[shape.get('index')];
            this.adjustAnnotationWithoutRepaint(shape, annotation);
            this.view.annotation().repaint();
          },
        },
        leave: {
          animation: 'funnelFadeOut',
          prepare: (shape) => {
            const annotation = this.view.annotation().annotations[shape.get('index')];
            annotation.change({ style: { opacity: 0 } });
            this.view.annotation().repaint();
          },
        },
      };
    }
  }

  protected geometryParser(dim, type) {
    if (dim === 'g2') {
      return G2_GEOM_MAP[type];
    }
    return PLOT_GEOM_MAP[type];
  }

  public afterRender() {
    this.paddingController.clear();
    this.view.get('elements').forEach((el) => {
      this.paddingController.registerPadding(el.get('container'), 'inner');
    });
    super.afterRender();
    this.adjustLegends();
    this.adjustAnnotations();
  }

  public updateConfig(cfg: Partial<T>): void {
    super.updateConfig(cfg);
    this.shouldAdjustLegends = true;
    this.shouldAdjustAnnotations = false;
  }

  protected extractLabel() {
    const props = this.options;
    const label = props.label;

    if (label && label.visible === false) {
      return false;
    }

    const labelConfig = getComponent('label', {
      plot: this,
      fields: [props.xField, props.yField],
      ...label,
    });

    const callback = labelConfig.callback.bind(labelConfig);
    labelConfig.callback = (xValue, yValue) => {
      const config = callback(xValue, yValue);
      if (_.isFunction(label.formatter)) {
        config.formatter = (text, item, idx) => label.formatter(xValue, yValue, item, idx);
      }
      return config;
    };

    return labelConfig;
  }

  protected extractPercentage(datum) {
    const props = this.options;
    const percentage = props.percentage || {};

    const percentageConfig = _.deepMix(
      {
        style: {
          fill: percentage.adjustColor === false ? 'white' : 'transparent',
        },
      },
      percentage,
      {
        top: true,
        type: 'text',
        position: [datum[props.xField], 'median'],
        style: {},
      }
    );

    if (percentage.visible === false) {
      percentageConfig.style.opacity = 0;
    }

    if (_.isFunction(percentage.formatter)) {
      percentageConfig.content = percentage.formatter(this.yValueTop, datum[props.yField]);
    }

    delete percentageConfig.visible;
    delete percentageConfig.formatter;
    delete percentageConfig.adjustColor;
    return percentageConfig;
  }

  protected adjustLegends() {
    if (!this.shouldAdjustLegends) return;

    this.shouldAdjustLegends = false;
    const { options: props } = this;
    if (['top-center', 'bottom-center'].indexOf(props.legend.position) >= 0) {
      const legendController = this.view.get('legendController');
      legendController.legends.forEach((legend) => {
        const legendGroup = legend.get('container');
        const offsetX =
          -(props.padding[1] - this.config.theme.bleeding[1] - (props.padding[3] - this.config.theme.bleeding[3])) / 2;
        legendGroup.translate(offsetX, 0);
      });
    }
  }

  protected adjustAnnotations() {
    if (!this.shouldAdjustAnnotations) return;

    const { options: props } = this;
    const { annotations } = this.view.annotation();
    this.view.eachShape((datum, shape) => {
      const annotation = annotations.find((annotation) => annotation.cfg.position[0] == datum[props.xField]);
      this.adjustAnnotationWithoutRepaint(shape, annotation);
    });
    this.view.annotation().repaint();
  }

  protected adjustAnnotationWithoutRepaint(shape, annotation) {
    const { options: props } = this;
    if (_.get(props, 'percentage.adjustColor') === false) return;

    if (annotation) {
      const shapeColor = shape.attr('fill');
      const shapeOpacity = _.isNumber(shape.attr('opacity')) ? Math.min(Math.max(0, shape.attr('opacity')), 1) : 1;

      const rgb = rgb2arr(shapeColor);
      const gray = Math.round(rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114) / shapeOpacity;

      const fill = gray < 156 ? '#f6f6f6' : '#303030';

      annotation.change({ style: { fill } });
    }
  }
}

registerPlotType('funnel', FunnelLayer);
