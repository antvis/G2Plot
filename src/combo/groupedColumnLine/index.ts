import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import GroupedColumnLineLayer, { GroupedColumnLineViewConfig } from './layer';

export interface GroupedColumnLineConfig extends GroupedColumnLineViewConfig, PlotConfig {}

export default class GroupedColumnLine extends BasePlot<GroupedColumnLineConfig> {
  public static getDefaultOptions: typeof GroupedColumnLineLayer.getDefaultOptions =
    GroupedColumnLineLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'groupedColumnLine';
    super.createLayers(layerProps);
  }
}
