import BasePlot from '../../base/plot';
import LiquidLayer, { LiquidLayerConfig } from './layer';

export { LiquidLayerConfig as LiquidConfig };

export default class Liquid extends BasePlot<LiquidLayerConfig> {
  protected init() {
    const layer = new LiquidLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getPlotRange(),
      this.initialProps
    );
    this.addLayer(layer);
  }
}
