import SliderPlot, { SliderPlotConfig, SliderType } from '../../base/SliderPlot';
import ViewLayer from '../../base/ViewLayer';
import LineLayer, { LineLayerConfig } from './LineLayer';

export interface LineConfig extends LineLayerConfig, SliderPlotConfig {}

export default class Line extends SliderPlot<LineConfig> {
  protected sliderType: SliderType = SliderType.Horizontal;

  protected addMainLayer(): ViewLayer<LineConfig> {
    const layer = new LineLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getMainLayerRange(),
      this.initialProps
    );
    this.addLayer(layer);

    return layer;
  }
}
