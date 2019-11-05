import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot-refactor';
import GroupBarLayer, { GroupBarLayerConfig } from './layer-refactor';

export interface GroupBarConfig extends GroupBarLayerConfig, PlotCfg {}


export default class GroupBar<T extends GroupBarConfig = GroupBarConfig> extends BasePlot<T> {
  public static getDefaultProps = GroupBarLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'groupBar';
    super.createLayers(layerProps);
  }
}