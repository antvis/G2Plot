import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import GroupedBarLayer, { GroupedBarViewConfig } from './layer';

export interface GroupedBarConfig extends GroupedBarViewConfig, PlotConfig {}

export default class GroupedBar extends BasePlot<GroupedBarConfig> {
  public static getDefaultOptions: typeof GroupedBarLayer.getDefaultOptions = GroupedBarLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'groupedBar';
    super.createLayers(layerProps);
  }
}
