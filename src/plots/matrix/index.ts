import {deepMix} from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import MatrixLayer, { MatrixLayerConfig } from './layer';

export interface MatrixConfig extends MatrixLayerConfig, PlotConfig {}

export default class Matrix extends BasePlot<MatrixConfig> {
  public static getDefaultOptions: typeof MatrixLayer.getDefaultOptions = MatrixLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'matrix';
    super.createLayers(layerProps);
  }

  public changeShape(type: string) {
    const layer: any = this.layers[0];
    layer.changeShape(type);
  }

  public mappingSize(field: string) {
    const layer: any = this.layers[0];
    layer.mappingSize(field);
  }

  public disableMappingSize() {
    const layer: any = this.layers[0];
    layer.disableMappingSize();
  }
}