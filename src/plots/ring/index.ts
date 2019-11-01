import Pie from '../pie';
import RingLayer, { RingLayerConfig } from './layer';

export { RingLayerConfig as RingConfig };

export default class Ring extends Pie<RingLayerConfig> {
  protected init() {
    const layer = new RingLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getPlotRange(),
      this.initialProps
    );
    this.addLayer(layer);
  }
}
