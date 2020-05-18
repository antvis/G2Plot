import { deepMix } from '@antv/util';
import BasePlot, { PlotConfig } from '../../base/plot';
import HeatmapLayer, { HeatmapLayerConfig } from './layer';

export interface HeatmapConfig extends HeatmapLayerConfig, PlotConfig {}

export default class Heatmap extends BasePlot<HeatmapConfig> {
  public static getDefaultOptions: typeof HeatmapLayer.getDefaultOptions = HeatmapLayer.getDefaultOptions;

  public createLayers(props) {
    const layerProps = deepMix({}, props);
    layerProps.type = 'heatmap';
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

  public getSizeScale() {
    const layer: any = this.layers[0];
    return layer.getSizeScale();
  }
}
