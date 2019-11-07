import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot';
import ColumnLayer, { ColumnLayerConfig } from './layer';

export interface ColumnConfig extends ColumnLayerConfig, PlotCfg {}

export default class Column<T extends ColumnConfig = ColumnConfig> extends BasePlot<T> {
  public static getDefaultOptions: typeof ColumnLayer.getDefaultOptions = ColumnLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'column';
    super.createLayers(layerProps);
  }
}
