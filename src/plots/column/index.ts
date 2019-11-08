import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import ColumnLayer, { ColumnViewConfig } from './layer';

export interface ColumnConfig extends ColumnViewConfig, PlotConfig {}

export default class Column<T extends ColumnConfig = ColumnConfig> extends BasePlot<T> {
  public static getDefaultOptions: typeof ColumnLayer.getDefaultOptions = ColumnLayer.getDefaultOptions;

  public createLayers(props: T) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'column';
    super.createLayers(layerProps);
  }
}
