import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import RangeColumnLayer, { RangeColumnViewConfig } from './layer';

export interface RangeColumnConfig extends RangeColumnViewConfig, PlotConfig {}

export default class RangeColumn extends BasePlot<RangeColumnConfig> {
  public static getDefaultOptions: typeof RangeColumnLayer.getDefaultOptions = RangeColumnLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'rangeColumn';
    super.createLayers(layerProps);
  }
}
