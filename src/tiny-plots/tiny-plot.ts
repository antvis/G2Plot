import BasePlot, { PlotConfig } from '../base/plot';
import { TinyViewConfig } from './tiny-layer';

export interface TinyPlotConfig extends TinyViewConfig, PlotConfig {}

export default abstract class TinyPlot<T extends TinyPlotConfig = TinyPlotConfig> extends BasePlot<T> {
  //
}
