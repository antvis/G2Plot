import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import StackColumnLayer, { StackColumnViewConfig } from './layer';

export interface StackColumnConfig extends StackColumnViewConfig, PlotConfig {}

export default class StackColumn<T extends StackColumnConfig = StackColumnConfig> extends BasePlot<T> {
  public static getDefaultOptions: typeof StackColumnLayer.getDefaultOptions = StackColumnLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'stackColumn';
    super.createLayers(layerProps);
  }
}
