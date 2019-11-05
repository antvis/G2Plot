import * as _ from '@antv/util';
import BasePlot, { PlotCfg } from '../../base/plot-refactor';
import StackColumnLayer, { StackColumnLayerConfig } from './layer-refactor';

export interface StackColumnConfig extends StackColumnLayerConfig, PlotCfg {}


export default class StackColumn<T extends StackColumnConfig = StackColumnConfig> extends BasePlot<T> {
  public static getDefaultProps = StackColumnLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'stackColumn';
    super.createLayers(layerProps);
  }
}