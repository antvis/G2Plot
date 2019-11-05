import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot-refactor';
import RingLayer, { RingLayerConfig } from './layer-refactor';

export interface RingConfig extends RingLayerConfig, PlotCfg {}

export default class Ring<T extends RingConfig = RingConfig> extends BasePlot<T> {
  public static getDefaultProps = RingLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'ring';
    super.createLayers(layerProps);
  }
}
