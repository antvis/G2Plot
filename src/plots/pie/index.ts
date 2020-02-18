import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import PieLayer, { PieViewConfig } from './layer';

export interface PieConfig extends PieViewConfig, PlotConfig {}

export default class Pie extends BasePlot<PieConfig> {
  public static getDefaultOptions: typeof PieLayer.getDefaultOptions = PieLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'pie';
    super.createLayers(layerProps);
  }
}
