import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import GroupedRoseLayer, { GroupedRoseViewConfig } from './layer';

export interface GroupedRoseConfig extends GroupedRoseViewConfig, PlotConfig {}

export default class GroupedRose extends BasePlot<GroupedRoseConfig> {
  public static getDefaultOptions: typeof GroupedRoseLayer.getDefaultOptions = GroupedRoseLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'groupedRose';
    super.createLayers(layerProps);
  }
}
