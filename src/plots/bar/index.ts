import BasePlot from '../../base/Plot';
import BarLayer, { BarLayerConfig } from './BarLayer';

export { BarLayerConfig as BarConfig };

export default class Bar<T extends BarLayerConfig = BarLayerConfig> extends BasePlot<T> {
  protected init() {
    const layer = new BarLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getPlotRange(),
      this.initialProps
    );
    this.addLayer(layer);
  }
}
