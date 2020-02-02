import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import TreemapLayer, { TreemapViewConfig } from './layer';

export interface TreemapConfig extends TreemapViewConfig, PlotConfig {}

export default class Treemap extends BasePlot<TreemapConfig> {
  public static getDefaultOptions: typeof TreemapLayer.getDefaultOptions = TreemapLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'treemap';
    super.createLayers(layerProps);
  }
}
