import BasePlot from '../../base/Plot';
import LiquidLayer, { LiquidLayerConfig } from './LiquidLayer';

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
