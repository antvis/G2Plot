import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot-refactor';
import GroupColumnLayer, { GroupColumnLayerConfig } from './layer-refactor';

export interface GroupColumnConfig extends GroupColumnLayerConfig, PlotCfg {}


export default class GroupColumn<T extends GroupColumnConfig = GroupColumnConfig> extends BasePlot<T> {
  public static getDefaultProps = GroupColumnLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'groupColumn';
    super.createLayers(layerProps);
  }
}