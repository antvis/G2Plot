import { SliderPlotConfig } from '../../base/SliderPlot';
import ViewLayer from '../../base/ViewLayer';
import Column from '../column';
import StackColumnLayer, { StackColumnLayerConfig } from './StackColumnLayer';

export interface StackColumnConfig extends StackColumnLayerConfig, SliderPlotConfig {}

export default class StackColumn extends Column<StackColumnConfig> {
  protected addMainLayer(): ViewLayer<StackColumnConfig> {
    const layer = new StackColumnLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getMainLayerRange(),
      this.initialProps
    );
    this.addLayer(layer);

    return layer;
  }
}
