import SliderPlot, { SliderPlotConfig, SliderType } from '../../base/SliderPlot';
import ViewLayer from '../../base/ViewLayer';
import AreaLayer, { AreaLayerConfig } from './AreaLayer';

export interface AreaConfig extends AreaLayerConfig, SliderPlotConfig {}

export default class Area<T extends AreaConfig> extends SliderPlot<T> {
  protected sliderType: SliderType = SliderType.Horizontal;

  protected addMainLayer(): ViewLayer<T> {
    const layer = new AreaLayer(
      this.getCanvasController(),
      this.getThemeController(),
      this.getMainLayerRange(),
      this.initialProps
    );
    this.addLayer(layer);

    return layer;
  }
}
