import Area from '../area';
import DensityLayer, { DensityLayerConfig } from './layer';

export { DensityLayerConfig as DensityConfig };

export default class Density extends Area<DensityLayerConfig> {
  public static getDefaultProps = DensityLayer.getDefaultProps;
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
