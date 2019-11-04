import * as _ from '@antv/util';
import ViewLayer from '../base/view-layer';
import { getComponent } from '../components/factory';
import '../geoms/line/mini';
import BaseConfig from '../interface/config';

export interface TinyLayerConfig extends BaseConfig {
  indicator?: any;
}

export default abstract class TinyLayer<T extends TinyLayerConfig = TinyLayerConfig> extends ViewLayer<T> {
  public static getDefaultProps() {
    const globalDefaultProps = super.getDefaultProps();
    return _.deepMix({}, globalDefaultProps, {
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
  protected _setDefaultG2Config() {}

  protected _coord() {}

  protected _addGeometry() {}

  protected _annotation() {
    const props = this.initialProps;
    const config = [];
    _.each(props.guideLine, (line) => {
      const guideLine = getComponent('guideLine', {
        plot: this,
        cfg: line,
      });
      config.push(guideLine);
    });
    this.setConfig('annotations', config);
  }

  protected _animation() {}
}
