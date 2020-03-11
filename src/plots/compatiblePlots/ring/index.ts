import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../../base/plot';
import warning from 'warning';
import DonutLayer, { DonutViewConfig } from '../../donut/layer';

export interface RingConfig extends DonutViewConfig, PlotConfig {}

export default class Ring extends BasePlot<RingConfig> {
  public static getDefaultOptions: typeof DonutLayer.getDefaultOptions = DonutLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'donut';
    super.createLayers(layerProps);
    warning(false, 'Please use "Donut" instead of "Ring" which was not recommended.');
  }
}
