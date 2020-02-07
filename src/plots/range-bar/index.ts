import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import RangeBarLayer, { RangeBarViewConfig } from './layer';

export interface RangeBarConfig extends RangeBarViewConfig, PlotConfig {}

export default class RangeBar extends BasePlot<RangeBarConfig> {
  public static getDefaultOptions: typeof RangeBarLayer.getDefaultOptions = RangeBarLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'rangeBar';
    super.createLayers(layerProps);
  }
}
