import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import LineLayer, { LineViewConfig } from './layer';

export interface LineConfig extends LineViewConfig, PlotConfig {}

export default class Line extends BasePlot<LineConfig> {
  public static getDefaultOptions: typeof LineLayer.getDefaultOptions = LineLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'line';
    super.createLayers(layerProps);
  }
}
