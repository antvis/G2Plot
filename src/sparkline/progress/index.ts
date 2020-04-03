import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import ProgressLayer, { ProgressViewConfig } from './layer';

export interface ProgressConfig extends ProgressViewConfig, PlotConfig {}

export default class Progress extends BasePlot<ProgressConfig> {
  public static getDefaultOptions: typeof ProgressLayer.getDefaultOptions = ProgressLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'progress';
    super.createLayers(layerProps);
  }

  public update(value: number, style?) {
    const layer = this.layers[0] as any;
    layer.update(value, style);
  }
}
