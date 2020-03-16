import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../../base/plot';
import warning from 'warning';
import GroupedColumnLayer, { GroupedColumnViewConfig } from '../../grouped-column/layer';

export interface GroupColumnConfig extends GroupedColumnViewConfig, PlotConfig {}

export default class GroupColumn extends BasePlot<GroupColumnConfig> {
  public static getDefaultOptions: typeof GroupedColumnLayer.getDefaultOptions = GroupedColumnLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'groupedColumn';
    super.createLayers(layerProps);
    warning(false, 'Please use "GroupedColumn" instead of "GroupColumn" which was not recommended.');
  }
}
