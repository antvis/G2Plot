import SliderPlot, { SliderPlotConfig, SliderType } from '../../base/SliderPlot';
import ViewLayer from '../../base/ViewLayer';

import ColumnLayer, { ColumnLayerConfig } from './ColumnLayer';

export interface ColumnConfig extends ColumnLayerConfig, SliderPlotConfig {}

export default class Column<T extends ColumnLayerConfig = ColumnLayerConfig> extends SliderPlot<T> {
  protected sliderType: SliderType = SliderType.Horizontal;

  protected addMainLayer(): ViewLayer<T> {
    const layer = new ColumnLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getMainLayerRange(),
      this.initialProps
    );
    this.addLayer(layer);

    return layer;
  }
}
