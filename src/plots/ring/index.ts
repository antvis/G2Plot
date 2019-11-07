import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot';
import RingLayer, { RingLayerConfig } from './layer';

export interface RingConfig extends RingLayerConfig, PlotCfg {}

export default class Ring<T extends RingConfig = RingConfig> extends BasePlot<T> {
  public static getDefaultOptions: typeof RingLayer.getDefaultOptions = RingLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'ring';
    super.createLayers(layerProps);
  }
}
