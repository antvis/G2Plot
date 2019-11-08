import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import TinyPlot from '../tiny-plot';
import RingProgressLayer, { RingProgressViewConfig } from './layer';

export interface RingProgressConfig extends RingProgressViewConfig, PlotConfig {}

export default class RingProgress<T extends RingProgressConfig = RingProgressConfig> extends BasePlot<T> {
  public static getDefaultOptions: typeof RingProgressLayer.getDefaultOptions = RingProgressLayer.getDefaultOptions;

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
