/**
 * Create By Bruce Too
 * On 2020-02-18
 */
import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import WaterfallLayer, { WaterfallViewConfig } from './layer';

export interface WaterfallConfig extends WaterfallViewConfig, PlotConfig {}

export default class Waterfall extends BasePlot<WaterfallConfig> {
  public static getDefaultOptions: typeof WaterfallLayer.getDefaultOptions = WaterfallLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'waterfall';
    super.createLayers(layerProps);
  }
}
