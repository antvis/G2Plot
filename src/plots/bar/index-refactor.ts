import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot-refactor';
import BarLayer, { BarLayerConfig } from './layer-refactor';

export interface BarConfig extends BarLayerConfig, PlotCfg {}

export default class Bar<T extends BarConfig = BarConfig> extends BasePlot<T> {
  public static getDefaultProps = BarLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'bar';
    super.createLayers(layerProps);
  }
}