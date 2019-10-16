import BasePlot from '../../base/Plot';
import LineLayer, { LineLayerConfig } from './LineLayer';

export interface LineConfig extends LineLayerConfig {}

export default class Line extends BasePlot<LineConfig> {
  protected init() {
    const layer = new LineLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getPlotRange(),
      this.initialProps
    );
    this.addLayer(layer);
  }
}
