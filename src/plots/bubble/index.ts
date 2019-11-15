import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import BubbleLayer, { BubbleViewConfig } from './layer';

export interface BubbleConfig extends BubbleViewConfig, PlotConfig {}

export default class Bubble extends BasePlot<BubbleConfig> {
  public static getDefaultOptions: typeof BubbleLayer.getDefaultOptions = BubbleLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'bubble';
    super.createLayers(layerProps);
  }
}
