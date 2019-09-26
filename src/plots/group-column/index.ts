import Column from '../column';
import GroupColumnLayer, { GroupColumnLayerConfig } from './GroupColumnLayer';

export { GroupColumnLayerConfig as GroupColumnConfig };

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
