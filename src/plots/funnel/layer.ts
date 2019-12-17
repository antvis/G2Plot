import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getGeom } from '../../geoms/factory';
import { ElementOption, DataItem } from '../../interface/config';
import { rgb2arr } from '../../util/color';
import './theme';

const G2_GEOM_MAP = {
  column: 'interval',
};

const PLOT_GEOM_MAP = {
  interval: 'funnel',
};

export type FunnelViewConfig = ViewConfig;

export interface FunnelLayerConfig extends FunnelViewConfig, LayerConfig {}

export default class FunnelLayer<T extends FunnelLayerConfig = FunnelLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): Partial<FunnelViewConfig> {
    const cfg: Partial<FunnelViewConfig> = {
      xAxis: {
        visible: false,
      },
      yAxis: {
        visible: false,
      },
      label: {
        visible: true,
      },
      padding: 'auto',
      legend: {
        position: 'bottom-center',
      },
      tooltip: {
        visible: true,
        shared: false,
        showTitle: false,
        crosshairs: {
          type: 'cross',
          style: {
            strokeOpacity: 0,
          },
        },
      },
    };
    return _.deepMix({}, super.getDefaultOptions(), cfg);
  }

  public funnel: any;
  public type: string = 'funnel';
  private funnelTop?: number;

  protected processData(data?: DataItem[]): DataItem[] | undefined {
    const { options } = this;
    if (data && data[0]) {
      this.funnelTop = +data[0][options.yField] || undefined;
    } else {
      this.funnelTop = undefined;
    }
    return super.processData(data);
  }

  protected coord() {
    const coordConfig = {
      actions: [['transpose'], ['scale', 1, -1]],
    };
    this.setConfig('coord', coordConfig);
  }

  protected adjustFunnel(funnel: ElementOption) {
    const { options } = this;

    funnel.shape = {
      values: ['funnel'],
    };

    funnel.color = {
      fields: [options.xField],
      values: options.color && (Array.isArray(options.color) ? options.color : [options.color]),
    };

    funnel.adjust = [
      {
        type: 'symmetric',
      },
    ];

    funnel.label = {
      fields: [options.xField, options.yField],
      callback(xValue, yValue) {
        return {
          offsetX: 16,
          labelLine: {
            lineWidth: 1,
            stroke: 'rgba(0, 0, 0, 0.25)',
          },
          content: `${xValue} ${yValue}`,
        };
      },
    };
  }

  protected addGeometry() {
    const props = this.options;
    const funnel = getGeom('interval', 'main', {
      positionFields: [props.xField, props.yField],
      plot: this,
    });
    this.adjustFunnel(funnel);
    this.funnel = funnel;
    this.setConfig('element', funnel);
  }

  protected annotation() {
    const { options } = this;
    const annotationConfigs = [];

    this.getData().forEach((datum, i) => {
      annotationConfigs.push({
        top: true,
        type: 'text',
        position: [datum[options.xField], 'median'],
        content: this.funnelTop ? ((100 * datum[options.yField]) / this.funnelTop).toFixed(1) + ' %' : '',
        style: {
          fill: 'transparent',
          fontSize: '12',
          textAlign: 'center',
          shadowBlur: 2,
          shadowColor: 'transparent',
        },
      });
    });

    this.setConfig('annotations', annotationConfigs);
  }

  protected animation() {
    const props = this.options;
    if (props.animation === false) {
      /** 关闭动画 */
      this.funnel.animate = false;
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
    this.adjustLegend();
    this.adjustAnnotation();
  }

  protected adjustLegend() {
    const { options } = this;

    if (['top-center', 'bottom-center'].indexOf(options.legend.position) >= 0) {
      const legendController = this.view.get('legendController');
      legendController.legends.forEach((legend) => {
        const legendGroup = legend.get('container');
        const offsetX =
          -(options.padding[1] - this.config.theme.bleeding[1] - (options.padding[3] - this.config.theme.bleeding[3])) /
          4;
        legendGroup.translate(offsetX, 0);
      });
    }
  }

  protected adjustAnnotation() {
    const { options } = this;
    const { annotations } = this.view.annotation();
    this.view.eachShape((datum, shape) => {
      const annotation = annotations.find((annotation) => annotation.cfg.position[0] == datum[options.xField]);
      if (annotation) {
        const shapeColor = shape.attr('fill');
        const shapeOpacity = shape.attr('opacity') ? shape.attr('opacity') : 1;

        const rgb = rgb2arr(shapeColor);
        const gray = Math.round(rgb[0] * 0.299 + rgb[1] * 0.587 + rgb[2] * 0.114) / shapeOpacity;

        const fill = gray < 128 ? '#f6f6f6' : '#303030';

        annotation.change(_.deepMix(annotation.cfg, { style: { fill } }));
      }
    });
    this.view.annotation().repaint();
  }
}

registerPlotType('funnel', FunnelLayer);
