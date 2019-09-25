import * as _ from '@antv/util';
import BaseLayer from '../base/ViewLayer';
import { getComponent } from '../components/factory';
import '../geoms/line/mini';
import BaseConfig from '../interface/config';

export interface TinyLayerConfig extends BaseConfig {
  indicator?: any;
}

export default abstract class TinyLayer<T extends TinyLayerConfig = TinyLayerConfig> extends BaseLayer<T> {
  protected _setDefaultG2Config() {}

  protected beforeInit() {
    const props = this.initialProps;
    const defaultProps = this._getDefaultProps();
    this.initialProps = _.deepMix({}, props, defaultProps);
  }

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

  protected _interactions() {}

  private _getDefaultProps() {
    return {
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
    };
  }
}
