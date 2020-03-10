import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import GroupedColumnLayer, { GroupedColumnViewConfig } from './layer';

export interface GroupedColumnConfig extends GroupedColumnViewConfig, PlotConfig {}

export default class GroupedColumn extends BasePlot<GroupedColumnConfig> {
  public static getDefaultOptions: typeof GroupedColumnLayer.getDefaultOptions = GroupedColumnLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'groupedColumn';
    super.createLayers(layerProps);
  }
}
