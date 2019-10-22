import Line from '../line';
import DensityLayer, { DensityLayerConfig } from './layer';

export { DensityLayerConfig as DensityConfig };

export default class Density extends Line<DensityLayerConfig> {
  protected init() {
    const layer = new DensityLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getPlotRange(),
      this.initialProps
    );
    this.addLayer(layer);
  }
}
