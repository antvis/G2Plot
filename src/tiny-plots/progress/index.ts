import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import TinyPlot from '../tiny-plot';
import ProgressLayer, { ProgressViewConfig } from './layer';

export interface ProgressConfig extends ProgressViewConfig, PlotConfig {}

export default class Progress extends BasePlot<ProgressConfig> {
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
