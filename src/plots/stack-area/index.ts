import Area from '../area';
import StackAreaLayer, { StackAreaLayerConfig } from './StackAreaLayer';

export { StackAreaLayerConfig as StackAreaConfig };

export default class StackArea extends Area<StackAreaLayerConfig> {
  protected init() {
    const layer = new StackAreaLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getPlotRange(),
      this.initialProps
    );
    this.addLayer(layer);
  }
}
