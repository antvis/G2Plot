import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import RangedColumnLayer, { RangedColumnViewConfig } from './layer';

export interface RangedColumnConfig extends RangedColumnViewConfig, PlotConfig {}

export default class RangedColumn extends BasePlot<RangedColumnConfig> {
  public static getDefaultOptions: typeof RangedColumnLayer.getDefaultOptions = RangedColumnLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'rangedColumn';
    super.createLayers(layerProps);
  }
}
