import * as _ from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import MatrixLayer, { MatrixLayerConfig } from './layer';

export interface MatrixConfig extends MatrixLayerConfig, PlotConfig {}

export default class Matrix extends BasePlot<MatrixConfig> {
  public static getDefaultOptions: typeof MatrixLayer.getDefaultOptions = MatrixLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = _.deepMix({}, props);
    layerProps.type = 'matrix';
    super.createLayers(layerProps);
  }
}
