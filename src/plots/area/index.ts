import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import AreaLayer from './layer';
import { AreaViewConfig } from './interface';

export interface AreaConfig extends AreaViewConfig, PlotConfig {}

export default class Area extends BasePlot<AreaConfig> {
  public static getDefaultOptions: typeof AreaLayer.getDefaultOptions = AreaLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'area';
    super.createLayers(layerProps);
  }
}
