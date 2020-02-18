import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import GroupBarLayer, { GroupBarViewConfig } from './layer';

export interface GroupBarConfig extends GroupBarViewConfig, PlotConfig {}

export default class GroupBar extends BasePlot<GroupBarConfig> {
  public static getDefaultOptions: typeof GroupBarLayer.getDefaultOptions = GroupBarLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'groupBar';
    super.createLayers(layerProps);
  }
}
