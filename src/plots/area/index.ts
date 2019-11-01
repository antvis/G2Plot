import BasePlot from '../../base/plot';
import AreaLayer, { AreaLayerConfig } from './layer';

export interface AreaConfig extends AreaLayerConfig {}

export default class Area<T extends AreaConfig> extends BasePlot<T> {
  protected init() {
    const layer = new AreaLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getPlotRange(),
      this.initialProps
    );
    this.addLayer(layer);
  }
}
