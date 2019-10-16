import BasePlot from '../../base/Plot';
import AreaLayer, { AreaLayerConfig } from './AreaLayer';

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
