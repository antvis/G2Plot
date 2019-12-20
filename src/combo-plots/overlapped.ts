import ComboPlot, { ComboPlotConfig } from './base';
import { Group } from '@antv/g';
import * as _ from '@antv/util';
import { getPlotType } from '../base/global';
import Layer from '../base/layer';

import '../plots/index';
import * as ComboUtil from './util';
import { getOverlappingPadding } from './util/padding';
import { getGlobalTheme } from '../theme/global';

export type OverlappedComboPlotConfig = ComboPlotConfig;

export default class OverlappedComboPlot<
  T extends OverlappedComboPlotConfig = OverlappedComboPlotConfig
> extends ComboPlot<T> {
  protected isOverlapped: boolean;
  protected topLayer: Layer;
  protected backLayer: Layer;
  protected legendInfo: any[];
  protected axisInfo: any[];
  protected legendContainer: Group;
  protected paddingComponents: any[];
  protected globalOptions: any;

  public getDefaultOptions() {
    return {
      xAxis: {
        visible: true,
        autoHideLabel: false,
        autoRotateLabel: false,
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
        },
        title: {
          visible: false,
          offset: 12,
        },
      },
      yAxis: {
        visible: true,
        autoHideLabel: false,
        autoRotateLabel: false,
        autoRotateTitle: true,
        grid: {
          visible: true,
        },
        line: {
          visible: true,
        },
        tickLine: {
          visible: true,
        },
        label: {
          visible: true,
        },
        title: {
          visible: false,
          offset: 12,
        },
        colorMapping: true,
        synchroTick: true,
      },
      label: {
        visible: false,
      },
      tooltip: {
        visible: true,
        sort: true,
      },
      legend: {
        visible: true,
        position: 'top-left',
      },
    };
  }

  protected createLayers(props: T & { layers?: any }) {
    super.createLayers(props);
    this.legendInfo = [];
    this.axisInfo = [];
    this.paddingComponents = [];
    /** add top layer for legend & tooltip */
    this.topLayer = new Layer({
      canvas: this.getCanvas(),
      width: this.width,
      height: this.height,
    });
    if (props.layers.length > 0) {
      /** create layers */
      _.each(props.layers, (layerCfg) => {
        const overlapConfig = this.getOverlappedConfig(layerCfg);
        const viewLayerCtr = getPlotType(layerCfg.type);
        const viewLayerProps: T = _.deepMix(
          {},
          layerCfg,
          {
            canvas: this.getCanvas(),
            x: layerCfg.x ? layerCfg.x : 0,
            y: layerCfg.y ? layerCfg.y : 0,
            width: layerCfg.width ? layerCfg.width : this.width,
            height: layerCfg.height ? layerCfg.height : this.height,
          },
          overlapConfig
        );
        const viewLayer = new viewLayerCtr(viewLayerProps);
        viewLayer.render();
        this.axisInfo.push(...ComboUtil.getAxisData(viewLayer, viewLayerProps, this.globalOptions));
        this.legendInfo.push(...ComboUtil.getLegendData(viewLayer, viewLayerProps));
        this.addLayer(viewLayer);
      });
    }

    this.backLayer = new Layer({
      canvas: this.getCanvas(),
      width: this.width,
      height: this.height,
    });

    if (this.globalOptions.legend.visible) {
      const legend = this.overlappingLegend();
      this.paddingComponents.push(legend);
    }

    this.overlappingLayout();
  }

  /** 图层叠加时的layer config */
  protected getOverlappedConfig(layerCfg) {
    return _.deepMix(
      {},
      {
        xAxis: {
          visible: false,
        },
        yAxis: {
          visible: false,
        },
        legend: {
          visible: false,
        },
        tooltip: {
          visible: false,
        },
        padding: [0, 0, 0, 0],
        color: ComboUtil.getColorConfig(layerCfg.type, layerCfg),
      }
    );
  }

  protected overlappingLegend() {
    const legendItems = ComboUtil.mergeLegendData(this.legendInfo);
    this.legendContainer = this.topLayer.container.addGroup();
    return ComboUtil.createLegend(
      legendItems,
      this.width,
      this.height,
      this.getCanvas(),
      this.globalOptions.legend.position
    );
  }

  protected overlappingLayout() {
    const { bleeding } = getGlobalTheme();
    // 先获取legend的padding
    const legendPadding = getOverlappingPadding(this.layers[0], this.paddingComponents);
    const axisComponents = ComboUtil.axesLayout(
      this.globalOptions,
      this.axisInfo,
      legendPadding,
      this.layers[0],
      this.width,
      this.height,
      this.getCanvas()
    );
    this.paddingComponents.push(...axisComponents);
    // 计算padding
    const padding = getOverlappingPadding(this.layers[0], this.paddingComponents);
    if (!this.globalOptions.xAxis.visible) {
      padding[2] += bleeding[2];
    }
    // 更新layers
    _.each(this.layers, (layer) => {
      layer.updateConfig({
        padding,
      });
      layer.render();
      layer.view
        .get('backgroundGroup')
        .get('backShape')
        .remove();
      layer.view
        .get('panelGroup')
        .get('backShape')
        .remove();
    });

    if (this.globalOptions.tooltip.visible) {
      ComboUtil.showTooltip(this.canvas, this.layers, this.globalOptions.tooltip);
    }
  }
}
