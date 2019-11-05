import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot-refactor';
import PercentageStackColumnLayer, { PercentageStackColumnLayerConfig } from './layer-refactor';

export interface PercentageStackColumnConfig extends PercentageStackColumnLayerConfig, PlotCfg {}

export default class PercentageStackColumn<
  T extends PercentageStackColumnConfig = PercentageStackColumnConfig
> extends BasePlot<T> {
  public static getDefaultProps = PercentageStackColumnLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'percentageStackColumn';
    super.createLayers(layerProps);
  }
}
