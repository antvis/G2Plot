import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import DensityHeatmapLayer, { DensityHeatmapViewConfig } from './layer';

export interface DensityHeatmapConfig extends DensityHeatmapViewConfig, PlotConfig {}

export default class DensityHeatmap extends BasePlot<DensityHeatmapConfig> {
  public static getDefaultOptions: typeof DensityHeatmapLayer.getDefaultOptions = DensityHeatmapLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'densityHeatmap';
    super.createLayers(layerProps);
  }
}
