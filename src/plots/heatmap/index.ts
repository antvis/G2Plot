import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import HeatmapLayer, { HeatmapViewConfig } from './layer';

export interface HeatmapConfig extends HeatmapViewConfig, PlotConfig {}

export default class Heatmap extends BasePlot<HeatmapConfig> {
  public static getDefaultOptions: typeof HeatmapLayer.getDefaultOptions = HeatmapLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'heatmap';
    super.createLayers(layerProps);
  }
}
