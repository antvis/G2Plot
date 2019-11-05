import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot-refactor';
import PercentageStackBarLayer, { PercentageStackBarLayerConfig } from './layer-refactor';

export interface PercentageStackBarConfig extends PercentageStackBarLayerConfig, PlotCfg {}

export default class PercentageStackBar<T extends PercentageStackBarConfig = PercentageStackBarConfig> extends BasePlot<
  T
> {
  public static getDefaultProps = PercentageStackBarLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'percentageStackBar';
    super.createLayers(layerProps);
  }
}
