import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import PieLayer, { PieViewConfig } from './layer';

export interface PieConfig extends PieViewConfig, PlotConfig {}

export default class Pie extends BasePlot<PieConfig, PieLayer> {
  public static getDefaultOptions: typeof PieLayer.getDefaultOptions = PieLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'pie';
    super.createLayers(layerProps);
  }

  public getAngleScale() {
    const layer: any = this.layers[0];
    return layer.getAngleScale();
  }
}
