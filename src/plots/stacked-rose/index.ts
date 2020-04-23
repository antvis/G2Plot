import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import StackedRoseLayer, { StackedRoseViewConfig } from './layer';

export interface StackedRoseConfig extends StackedRoseViewConfig, PlotConfig {}

export default class StackedRose extends BasePlot<StackedRoseConfig> {
  public static getDefaultOptions: typeof StackedRoseLayer.getDefaultOptions = StackedRoseLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'stackedRose';
    super.createLayers(layerProps);
  }

  public getRadiusScale() {
    const layer: any = this.layers[0];
    return layer.getRadiusScale();
  }

  public getAngleScale() {
    const layer: any = this.layers[0];
    return layer.getAngleScale();
  }
}
