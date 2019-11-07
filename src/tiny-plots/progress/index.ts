import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot';
import TinyPlot from '../tiny-plot';
import ProgressLayer, { ProgressLayerConfig } from './layer';

export interface ProgressConfig extends ProgressLayerConfig, PlotCfg {}

export default class Progress<T extends ProgressConfig = ProgressConfig> extends BasePlot<T> {
  public static getDefaultOptions: typeof ProgressLayer.getDefaultOptions = ProgressLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'progress';
    super.createLayers(layerProps);
  }

  public update(value: number) {
    const layer = this.layers[0] as any;
    layer.update(value);
  }
}
