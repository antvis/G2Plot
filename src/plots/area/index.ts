import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import AreaLayer, { AreaViewConfig } from './layer';

export interface AreaConfig extends AreaViewConfig, PlotConfig {}

export default class Area extends BasePlot<AreaConfig> {
  public static getDefaultOptions: typeof AreaLayer.getDefaultOptions = AreaLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'area';
    super.createLayers(layerProps);
  }
}
