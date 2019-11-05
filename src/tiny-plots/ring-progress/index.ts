import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot-refactor';
import TinyPlot from '../tiny-plot';
import RingProgressLayer, { RingProgressLayerConfig } from './layer';

export interface RingProgressConfig extends RingProgressLayerConfig, PlotCfg {}

export default class RingProgress<T extends RingProgressConfig = RingProgressConfig> extends BasePlot<T> {
  public static getDefaultOptions = RingProgressLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'ringProgress';
    super.createLayers(layerProps);
  }

  public update(value: number) {
    const layer = this.layers[0] as any;
    layer.update(value);
  }
}
