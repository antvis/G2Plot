import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot-refactor';
import PieLayer, { PieLayerConfig } from './layer-refactor';

export interface PieConfig extends PieLayerConfig, PlotCfg {}

export default class Pie<T extends PieConfig = PieConfig> extends BasePlot<T> {
  public static getDefaultProps = PieLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'pie';
    super.createLayers(layerProps);
  }
}
