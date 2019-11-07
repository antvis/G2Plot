import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot';
import PercentageStackColumnLayer, { PercentageStackColumnLayerConfig } from './layer';

export interface PercentageStackColumnConfig extends PercentageStackColumnLayerConfig, PlotCfg {}

export default class PercentageStackColumn<
  T extends PercentageStackColumnConfig = PercentageStackColumnConfig
> extends BasePlot<T> {
  public static getDefaultOptions: typeof PercentageStackColumnLayer.getDefaultOptions =
    PercentageStackColumnLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'percentageStackColumn';
    super.createLayers(layerProps);
  }
}
