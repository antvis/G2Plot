import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import RingLayer, { RingViewConfig } from './layer';

export interface RingConfig extends RingViewConfig, PlotConfig {}

export default class Ring extends BasePlot<RingConfig> {
  public static getDefaultOptions: typeof RingLayer.getDefaultOptions = RingLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'ring';
    super.createLayers(layerProps);
  }
}
