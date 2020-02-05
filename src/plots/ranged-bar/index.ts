import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import RangedBarLayer, { RangedBarViewConfig } from './layer';

export interface RangedBarConfig extends RangedBarViewConfig, PlotConfig {}

export default class RangedBar extends BasePlot<RangedBarConfig> {
  public static getDefaultOptions: typeof RangedBarLayer.getDefaultOptions = RangedBarLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'rangedBar';
    super.createLayers(layerProps);
  }
}
