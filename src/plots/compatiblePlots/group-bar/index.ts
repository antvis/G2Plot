import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../../base/plot';
import warning from 'warning';
import GroupedBarLayer, { GroupedBarViewConfig } from '../../grouped-bar/layer';

export interface GroupBarConfig extends GroupedBarViewConfig, PlotConfig {}

export default class GroupBar extends BasePlot<GroupBarConfig> {
  public static getDefaultOptions: typeof GroupedBarLayer.getDefaultOptions = GroupedBarLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'groupedBar';
    super.createLayers(layerProps);
    warning(false, 'Please use "GroupedBar" instead of "GroupBar" which was not recommended.');
  }
}
