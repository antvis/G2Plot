import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import StackedAreaLayer, { StackedAreaLayerConfig } from './layer';

export interface StackedAreaConfig extends StackedAreaLayerConfig, PlotConfig {}

export default class StackedArea extends BasePlot<StackedAreaConfig> {
  public static getDefaultOptions: typeof StackedAreaLayer.getDefaultOptions = StackedAreaLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'stackedArea';
    super.createLayers(layerProps);
  }
}
