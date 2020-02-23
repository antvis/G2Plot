import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import SunburstLayer, { SunburstViewConfig } from './layer';

export interface SunburstConfig extends SunburstViewConfig, PlotConfig {}

export default class Sunburst extends BasePlot<SunburstConfig> {
  public static getDefaultOptions: typeof SunburstLayer.getDefaultOptions = SunburstLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'sunburst';
    super.createLayers(layerProps);
  }
}
