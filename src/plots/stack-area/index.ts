import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot';
import StackAreaLayer, { StackAreaLayerConfig } from './layer';

export interface StackAreaConfig extends StackAreaLayerConfig, PlotCfg {}

export default class StackArea<T extends StackAreaConfig = StackAreaConfig> extends BasePlot<T> {
  public static getDefaultOptions: typeof StackAreaLayer.getDefaultOptions = StackAreaLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'stackArea';
    super.createLayers(layerProps);
  }
}
