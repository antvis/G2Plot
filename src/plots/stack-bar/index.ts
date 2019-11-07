import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot';
import StackBarLayer, { StackBarLayerConfig } from './layer';

export interface StackBarConfig extends StackBarLayerConfig, PlotCfg {}

export default class StackBar<T extends StackBarConfig = StackBarConfig> extends BasePlot<T> {
  public static getDefaultOptions: typeof StackBarLayer.getDefaultOptions = StackBarLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'stackBar';
    super.createLayers(layerProps);
  }
}
