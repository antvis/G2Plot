import Bar from '../bar';
import StackBarLayer, { StackBarLayerConfig } from './layer';

export { StackBarLayerConfig as StackBarConfig };

export default class StackBar extends Bar<StackBarLayerConfig> {
  public static getDefaultProps = StackBarLayer.getDefaultProps;
  protected init() {
    const layer = new StackBarLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getPlotRange(),
      this.initialProps
    );
    this.addLayer(layer);
  }
}
