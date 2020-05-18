import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import ColumnLineLayer, { ColumnLineViewConfig } from './layer';

export interface ColumnLineConfig extends ColumnLineViewConfig, PlotConfig {}

export default class ColumnLine extends BasePlot<ColumnLineConfig> {
  public static getDefaultOptions: typeof ColumnLineLayer.getDefaultOptions = ColumnLineLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'columnLine';
    super.createLayers(layerProps);
  }
}
