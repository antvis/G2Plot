import ComboPlot, { ComboPlotConfig } from './base';
import { Group } from '@antv/g';
import * as _ from '@antv/util';
import { getPlotType } from '../base/global';
import Layer from '../base/layer';
import '../plots/index';
import * as ComboUtil from './util';
import { getOverlappingPadding } from './util/padding';
import { getGlobalTheme } from '../theme/global';
import { ViewLayer } from '..';

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
  protected globalComponents: any[];
  protected singleGeomCount: number;

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

  constructor(container: HTMLElement, props: T) {
    super(container, props);
    this.options = props;
  }

  protected _createLayers() {
    super._createLayers();
    this.legendInfo = [];
    this.axisInfo = [];
    this.paddingComponents = [];
    this.globalComponents = [];
    this.singleGeomCount = 0;

    this.backLayer = new Layer({
      canvas: this.getCanvas(),
      width: this.width,
      height: this.height,
    });

    if (this.options.layers.length > 0) {
      /** create layers */
      _.each(this.options.layers, (layerCfg) => {
        const overlapConfig = this.getOverlappedConfig(layerCfg);
        const viewLayerCtr = getPlotType(layerCfg.type);
        const viewLayerProps: T = _.deepMix(
          {},
          layerCfg,
          {
            canvas: this.canvas,
            x: 0,
            y: 0,
            width: this.width,
            height: this.height,
          },
          overlapConfig
        );
        const viewLayer = new viewLayerCtr(viewLayerProps);
        viewLayer.hide();
        viewLayer.render();
        this.axisInfo.push(...ComboUtil.getAxisData(viewLayer, viewLayerProps, this.globalOptions));
        this.legendInfo.push(...ComboUtil.getLegendData(viewLayer, viewLayerProps));
        this.addLayer(viewLayer);
      });
    }

    /** add top layer for legend & tooltip */
    this.topLayer = new Layer({
      canvas: this.getCanvas(),
      width: this.width,
      height: this.height,
    });
  }

  /** 图层叠加时的layer config */
  protected getOverlappedConfig(layerCfg) {
    const colorCfg = ComboUtil.getColorConfig(layerCfg.type, layerCfg, this.singleGeomCount);
    if (colorCfg && colorCfg.single) {
      this.singleGeomCount++;
    }
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
        color: colorCfg ? colorCfg.color : null,
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

  public render() {
    this.destroy();
    this._createLayers();
    const { bleeding } = getGlobalTheme();
    if (this.globalOptions.legend.visible) {
      const legend = this.overlappingLegend();
      this.globalComponents.push({ type: 'legend', component: legend.component });
      this.paddingComponents.push(legend);
    }
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
    _.each(axisComponents, (axis) => {
      this.globalComponents.push({ type: 'axis', component: axis.component });
    });
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
      layer.show();
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

    //补画坐标轴grid
    if (this.globalOptions.yAxis.grid.visible) {
      const leftAxis = axisComponents[0].component;
      const containerLayer = this.layers[0] as ViewLayer;
      const coord = containerLayer.view.get('coord');
      const container = containerLayer.view.get('backgroundGroup');
      ComboUtil.drawYGrid(leftAxis, coord, container, this.globalOptions.yAxis.grid);
    }

    if (this.globalOptions.tooltip.visible) {
      const tooltip = ComboUtil.showTooltip(this.canvas, this.layers, this.globalOptions.tooltip);
      this.globalComponents.push({ type: 'tooltip', component: tooltip });
    }
  }

  public destroy() {
    this.clearComponents();
    this.eachLayer((layer) => {
      layer.destroy();
    });
    this.layers = [];
  }

  protected clearComponents() {
    _.each(this.globalComponents, (c) => {
      if (c.type === 'legend' || c.type === 'tooltip') {
        c.component.destroy();
      }
      if (c.type === 'axis') {
        c.component.clear();
      }
    });
    this.paddingComponents = [];
    this.globalComponents = [];
  }
}
