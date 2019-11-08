import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import StackBarLayer, { StackBarViewConfig } from './layer';

export interface StackBarConfig extends StackBarViewConfig, PlotConfig {}

export default class StackBar<T extends StackBarConfig = StackBarConfig> extends BasePlot<T> {
  public static getDefaultOptions: typeof StackBarLayer.getDefaultOptions = StackBarLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'stackBar';
    super.createLayers(layerProps);
  }
}
