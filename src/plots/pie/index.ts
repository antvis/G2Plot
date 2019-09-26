import BasePlot from '../../base/Plot';
import PieLayer, { PieLayerConfig } from './PieLayer';

export { PieLayerConfig as PieConfig };

export default class Pie<T extends PieLayerConfig = PieLayerConfig> extends BasePlot<PieLayerConfig> {
  protected init() {
    const layer = new PieLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getPlotRange(),
      this.initialProps
    );
    this.addLayer(layer);
  }
}
