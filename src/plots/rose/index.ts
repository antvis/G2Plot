import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import RoseLayer, { RoseViewConfig } from './layer';

export interface RoseConfig extends RoseViewConfig, PlotConfig {}

export default class Rose extends BasePlot<RoseConfig> {
  public static getDefaultOptions: typeof RoseLayer.getDefaultOptions = RoseLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'rose';
    super.createLayers(layerProps);
  }
}
