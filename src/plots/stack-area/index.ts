import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import StackAreaLayer, { StackAreaLayerConfig } from './layer';

export interface StackAreaConfig extends StackAreaLayerConfig, PlotConfig {}

export default class StackArea extends BasePlot<StackAreaConfig> {
  public static getDefaultOptions: typeof StackAreaLayer.getDefaultOptions = StackAreaLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'stackArea';
    super.createLayers(layerProps);
  }
}
