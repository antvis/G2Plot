import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot';
import BubbleLayer, { BubbleLayerConfig } from './layer';

export interface BubbleConfig extends BubbleLayerConfig, PlotCfg {}

export default class Bubble<T extends BubbleConfig = BubbleConfig> extends BasePlot<T> {
  public static getDefaultOptions: typeof BubbleLayer.getDefaultOptions = BubbleLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'bubble';
    super.createLayers(layerProps);
  }
}
