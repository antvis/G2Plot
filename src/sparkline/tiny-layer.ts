import * as _ from '@antv/util';
import { LayerConfig } from '../base/layer';
import ViewLayer, { ViewConfig } from '../base/view-layer';
import { getComponent } from '../components/factory';
import '../geoms/line/mini';

export interface TinyViewConfig extends ViewConfig {
  indicator?: any;
  guideLine?: any; // FIXME:
}

export interface TinyLayerConfig extends TinyViewConfig, LayerConfig {}

export default abstract class TinyLayer<T extends TinyLayerConfig = TinyLayerConfig> extends ViewLayer<T> {
  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
      title: {
        visible: false,
      },
      description: {
        visible: false,
      },
      padding: [0, 0, 0, 0],
      legend: {
        visible: false,
      },
      xAxis: {
        visible: false,
      },
      yAxis: {
        visible: false,
      },
      tooltip: {
        visible: false,
      },
    });
  }

  protected coord() {}

  protected addGeometry() {}

  protected annotation() {
    const props = this.options;
    const config = [];
    const defaultGuidelineCfg = {
      line: {
        style: {
          lineWidth: 1,
          stroke: '#66d6a8',
        },
      },
    };
    _.each(props.guideLine, (line) => {
      const guideLine = getComponent('guideLine', {
        plot: this,
        cfg: _.deepMix({}, defaultGuidelineCfg, line),
      });
      config.push(guideLine);
    });
    this.setConfig('annotations', config);
  }

  protected animation() {}
}
