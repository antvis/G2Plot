import Plot, { PlotConfig } from '../base/plot';
import { deepMix } from '@antv/util';
import ViewLayer from '../base/view-layer';

export interface ComboPlotConfig extends PlotConfig {
  layers: ViewLayer[];
}

export default class ComboPlot<T extends ComboPlotConfig = ComboPlotConfig> extends Plot<T> {
  public options: any;
  protected globalOptions: any;

  public getDefaultOptions() {
    return {};
  }

  protected getGlobalOptions(props) {
    return {
      xAxis: props.xAxis,
      yAxis: props.yAxis,
      theme: props.theme,
      legend: props.legend,
    };
  }

  protected createComboLayers() {
    this.globalOptions = deepMix({}, this.getDefaultOptions(), this.getGlobalOptions(this.options));
  }
}
