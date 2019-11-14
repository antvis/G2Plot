import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import GroupColumnLayer, { GroupColumnViewConfig } from './layer';

export interface GroupColumnConfig extends GroupColumnViewConfig, PlotConfig {}

export default class GroupColumn extends BasePlot<GroupColumnConfig> {
  public static getDefaultOptions: typeof GroupColumnLayer.getDefaultOptions = GroupColumnLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'groupColumn';
    super.createLayers(layerProps);
  }
}
