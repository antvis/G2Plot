import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot';
import StackColumnLayer, { StackColumnLayerConfig } from './layer';

export interface StackColumnConfig extends StackColumnLayerConfig, PlotCfg {}

export default class StackColumn<T extends StackColumnConfig = StackColumnConfig> extends BasePlot<T> {
  public static getDefaultOptions: typeof StackColumnLayer.getDefaultOptions = StackColumnLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'stackColumn';
    super.createLayers(layerProps);
  }
}
