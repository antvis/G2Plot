import { deepMix, each, has } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import ViewLayer, { ViewConfig } from '../../base/view-layer';
import { getComponent } from '../../components/factory';
import { getGeom } from '../../geoms/factory';
import { extractScale } from '../../util/scale';
import '../../geoms/heatmap/linear';
import { HeatmapLegendConfig } from './components/legend';
import { HeatmapBackgroundConfig } from './components/background';
import { getPlotComponents } from './components';
import * as EventParser from './event';
import { GraphicStyle } from '../../interface/config';

export interface DensityHeatmapViewConfig extends ViewConfig {
  colorField: string;
  radius?: number;
  intensity?: number;
  point?: {
    visible?: boolean;
    shape?: string;
    size?: number;
    color?: string;
    style?: GraphicStyle;
  };
  legend?: HeatmapLegendConfig;
  background?: HeatmapBackgroundConfig;
}

export interface DensityHeatmapLayerConfig extends DensityHeatmapViewConfig, LayerConfig {}

export default class DensityHeatmapLayer<
  T extends DensityHeatmapLayerConfig = DensityHeatmapLayerConfig
> extends ViewLayer<T> {
  public type: string = 'densityHeatmap';
  protected plotComponents: any[] = [];

  public static getDefaultOptions(): any {
    return deepMix({}, super.getDefaultOptions(), {
      xAxis: {
        visible: true,
        autoRotateTitle: false,
        grid: {
          visible: false,
        },
        line: {
          visible: true,
        },
        tickLine: {
          visible: true,
        },
        label: {
          visible: true,
          autoHide: true,
          autoRotate: true,
        },
        title: {
          visible: false,
          spacing: 12,
        },
      },
      yAxis: {
        visible: true,
        autoRotateTitle: true,
        grid: {
          visible: false,
        },
        line: {
          visible: true,
        },
        tickLine: {
          visible: true,
        },
        label: {
          visible: true,
          autoHide: true,
          autoRotate: false,
        },
        title: {
          visible: false,
          spacing: 12,
        },
      },
      tooltip: {
        visible: true,
        showCrosshairs: true,
        crosshairs: {
          type: 'xy',
          line: {
            style: {
              stroke: '#000000',
              lineWidth: 1,
              opacity: 0.5,
            },
          },
        },
        showMarkers: false,
      },
      legend: {
        visible: true,
        position: 'bottom-center',
      },
      color: [
        'rgba(33,102,172,0)',
        'rgb(103,169,207)',
        'rgb(209,229,240)',
        'rgb(253,219,199)',
        'rgb(239,138,98)',
        'rgb(178,24,43)',
      ],
      interactions: [{ type: 'tooltip' }],
    });
  }

  public afterRender() {
    this.renderPlotComponents();
    super.afterRender();
  }

  public destroy() {
    each(this.plotComponents, (component) => {
      component.destroy();
    });
    super.destroy();
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
    super.scale();
  }

  protected coord() {
    return;
  }

  protected geometryParser() {
    return 'heatmap';
  }

  protected addGeometry() {
    if (this.options.data.length > 1) {
      const config = {
        type: 'linearheatmap',
        position: {
          fields: [this.options.xField, this.options.yField],
        },
        color: {
          fields: [this.options.colorField],
          values: this.options.color,
        },
        cfg: {
          intensity: this.options.intensity,
          radius: this.options.radius,
        },
      } as any;

      if (this.options.radius) {
        config.radius = this.options.radius;
      }

      if (this.options.intensity) {
        config.intensity = this.options.intensity;
      }

      if (this.options.tooltip && (this.options.tooltip.fields || this.options.tooltip.formatter)) {
        this.geometryTooltip(config);
      }

      this.setConfig('geometry', config);

      this.addPoint();
    }
  }

  protected addPoint() {
    const props = this.options;
    const defaultConfig = { visible: false, size: 0 };
    if (props.point && props.point.visible) {
      props.point = deepMix(defaultConfig, props.point);
    } else {
      props.point = defaultConfig;
    }
    const point = getGeom('point', 'guide', {
      plot: this,
    });
    point.active = false;
    // point.label = this.extractLabel();
    this.setConfig('geometry', point);
  }

  protected extractLabel() {
    const props = this.options;
    const label = props.label;
    if (label && label.visible === false) {
      return false;
    }
    const labelConfig = getComponent('label', {
      plot: this,
      labelType: 'scatterLabel',
      fields: [props.xField, props.yField],
      position: 'middle',
      offset: 0,
      ...label,
    });
    return labelConfig;
  }

  protected legend() {
    this.setConfig('legends', false);
  }

  protected geometryTooltip(config) {
    config.tooltip = {};
    const tooltipOptions: any = this.options.tooltip;
    if (tooltipOptions.fields) {
      config.tooltip.fields = tooltipOptions.fields;
    }
    if (tooltipOptions.formatter) {
      config.tooltip.callback = tooltipOptions.formatter;
      if (!tooltipOptions.fields) {
        config.tooltip.fields = [this.options.xField, this.options.yField];
        if (this.options.colorField) {
          config.tooltip.fields.push(this.options.colorField);
        }
      }
    }
  }

  protected parseEvents() {
    super.parseEvents(EventParser);
  }

  protected renderPlotComponents() {
    each(this.plotComponents, (component) => {
      component.destroy();
    });
    const componentsType = ['legend', 'background'];
    each(componentsType, (t) => {
      const cfg = {
        view: this.view,
        plot: this,
        ...this.options[t],
      };
      const component = getPlotComponents(this, t, cfg);
      if (component) {
        component.render();
        this.plotComponents.push(component);
      }
    });
  }
}

registerPlotType('densityHeatmap', DensityHeatmapLayer);
