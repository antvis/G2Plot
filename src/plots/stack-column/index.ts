import Column from '../column';
import StackColumnLayer, { StackColumnLayerConfig } from './StackColumnLayer';

export { StackColumnLayerConfig as StackColumnConfig };

export default class StackColumn extends Column<StackColumnLayerConfig> {
  protected init() {
    const layer = new StackColumnLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getPlotRange(),
      this.initialProps
    );
    this.addLayer(layer);
  }
}
