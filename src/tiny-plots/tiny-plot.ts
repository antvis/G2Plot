import BasePlot, { PlotCfg } from '../base/plot';
import { TinyLayerConfig } from './tiny-layer';

export interface TinyPlotConfig extends TinyLayerConfig, PlotCfg {}

export default abstract class TinyPlot<T extends TinyPlotConfig = TinyPlotConfig> extends BasePlot<T> {
  //
}
