import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import StackedRoseLayer, { StackedRoseViewConfig } from './layer';

export interface StackedRoseConfig extends StackedRoseViewConfig, PlotConfig {}

export default class StackedRose extends BasePlot<StackedRoseConfig> {
  public static getDefaultOptions: typeof StackedRoseLayer.getDefaultOptions = StackedRoseLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'stackedRose';
    super.createLayers(layerProps);
  }
}
