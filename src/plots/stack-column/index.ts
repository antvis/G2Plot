import Column from '../column';
import StackColumnLayer, { StackColumnLayerConfig } from './StackColumnLayer';

export interface StackColumnConfig extends StackColumnLayerConfig {}

export default class StackColumn extends Column<StackColumnConfig> {
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
