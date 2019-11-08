import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import AreaLayer, { AreaViewConfig } from './layer';

export interface AreaConfig extends AreaViewConfig, PlotConfig {}

export default class Area<T extends AreaConfig = AreaConfig> extends BasePlot<T> {
  public static getDefaultOptions: typeof AreaLayer.getDefaultOptions = AreaLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'area';
    super.createLayers(layerProps);
  }
}
