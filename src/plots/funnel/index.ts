import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import FunnelLayer, { FunnelViewConfig } from './layer';

export interface FunnelConfig extends FunnelViewConfig, PlotConfig {}

export default class Funnel extends BasePlot<FunnelConfig> {
  public static getDefaultOptions: typeof FunnelLayer.getDefaultOptions = FunnelLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'funnel';
    super.createLayers(layerProps);
  }
}
