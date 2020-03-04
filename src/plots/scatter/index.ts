import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import ScatterLayer, { ScatterViewConfig } from './layer';

export interface ScatterConfig extends ScatterViewConfig, PlotConfig {
  label?: ScatterViewConfig['label'] & {
    position?: 'top' | 'bottom' | 'left' | 'right' | 'middle';
  };
}

export default class Scatter extends BasePlot<ScatterConfig> {
  public static getDefaultOptions: typeof ScatterLayer.getDefaultOptions = ScatterLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'scatter';
    super.createLayers(layerProps);
  }
}
