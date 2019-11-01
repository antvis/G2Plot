import Column from '../column';
import GroupColumnLayer, { GroupColumnLayerConfig } from './layer';

export interface GroupColumnConfig extends GroupColumnLayerConfig {}

export default class GroupColumn extends Column<GroupColumnLayerConfig> {
  protected init() {
    const layer = new GroupColumnLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getPlotRange(),
      this.initialProps
    );
    this.addLayer(layer);
  }
}
