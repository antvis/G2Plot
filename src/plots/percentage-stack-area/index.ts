import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot';
import PercentageStackAreaLayer, { PercentageStackAreaLayerConfig } from './layer';

export interface PercentageStackAreaConfig extends PercentageStackAreaLayerConfig, PlotCfg {}

export default class PercentageStackArea<
  T extends PercentageStackAreaConfig = PercentageStackAreaConfig
> extends BasePlot<T> {
  public static getDefaultOptions: typeof PercentageStackAreaLayer.getDefaultOptions =
    PercentageStackAreaLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'percentageStackArea';
    super.createLayers(layerProps);
  }
}
