import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot';
import GroupBarLayer, { GroupBarLayerConfig } from './layer';

export interface GroupBarConfig extends GroupBarLayerConfig, PlotCfg {}

export default class GroupBar<T extends GroupBarConfig = GroupBarConfig> extends BasePlot<T> {
  public static getDefaultOptions: typeof GroupBarLayer.getDefaultOptions = GroupBarLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'groupBar';
    super.createLayers(layerProps);
  }
}
