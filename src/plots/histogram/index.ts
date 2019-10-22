import Column from '../column/index';
import HistogramLayer, { HistogramLayerConfig } from './layer';

export { HistogramLayerConfig as HistogramConfig };

export default class Histogram extends Column<HistogramLayerConfig> {
  protected init() {
    const layer = new HistogramLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getPlotRange(),
      this.initialProps
    );
    this.addLayer(layer);
  }
}
