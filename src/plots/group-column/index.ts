import { SliderPlotConfig } from '../../base/SliderPlot';
import ViewLayer from '../../base/ViewLayer';
import Column from '../column';
import GroupColumnLayer, { GroupColumnLayerConfig } from './GroupColumnLayer';

export interface GroupColumnConfig extends GroupColumnLayerConfig, SliderPlotConfig {}

export default class GroupColumn extends Column<GroupColumnLayerConfig> {
  protected addMainLayer(): ViewLayer<GroupColumnLayerConfig> {
    const layer = new GroupColumnLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getMainLayerRange(),
      this.initialProps
    );
    this.addLayer(layer);

    return layer;
  }
}
