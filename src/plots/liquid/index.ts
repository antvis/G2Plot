import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import LiquidLayer, { LiquidViewConfig } from './layer';

export interface LiquidConfig extends LiquidViewConfig, PlotConfig {}

export default class Liquid extends BasePlot<LiquidConfig> {
  public static getDefaultOptions: typeof LiquidLayer.getDefaultOptions = LiquidLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'liquid';
    super.createLayers(layerProps);
  }

  public changeValue(value: number, all: boolean = false) {
    if (all) {
      this.eachLayer((layer) => {
        if (layer instanceof LiquidLayer) {
          layer.changeValue(value);
        }
      });
    } else {
      const layer: any = this.layers[0];
      if (layer instanceof LiquidLayer) {
        layer.changeValue(value);
      }
    }
  }
}
