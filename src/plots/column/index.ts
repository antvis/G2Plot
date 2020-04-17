import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import ColumnLayer from './layer';
import { ColumnViewConfig } from './interface';

export interface ColumnConfig extends ColumnViewConfig, PlotConfig {}

export default class Column extends BasePlot<ColumnConfig> {
  public static getDefaultOptions: typeof ColumnLayer.getDefaultOptions = ColumnLayer.getDefaultOptions;

  public createLayers(props: ColumnConfig) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'column';
    super.createLayers(layerProps);
  }
}
