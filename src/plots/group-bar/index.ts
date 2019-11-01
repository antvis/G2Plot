import Bar from '../bar';
import GroupBarLayer, { GroupBarLayerConfig } from './layer';

export { GroupBarLayerConfig as GroupBarConfig };

export default class GroupBar extends Bar<GroupBarLayerConfig> {
  protected init() {
    const layer = new GroupBarLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getPlotRange(),
      this.initialProps
    );
    this.addLayer(layer);
  }
}
