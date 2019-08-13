import * as _ from '@antv/util';
import BasePlot from './plot';
import BaseConfig from '../interface/config';
import '../geoms/line/mini';

interface TinyConfig extends BaseConfig {
    indicator?:any
}


export default class TinyPlot <T extends TinyConfig = TinyConfig> extends BasePlot<T>{

  protected _setDefaultG2Config() { }

  protected _beforeInit() {
      const props = this._initialProps;
      const defaultProps = this._getDefaultProps();
      this._initialProps = _.deepMix({},props,defaultProps);
  }

  protected _coord() {}

  protected _addElements() {}

  protected _annotation() {}

  protected _animation() {}

  protected _interactions() {}

  private _getDefaultProps(){
      return {
          padding: [0,0,0,0],
          legend: {
              visible: false
          },
          xAxis: {
              visible: false
          },
          yAxis: {
              visible: false
          },
          tooltip:{
              visible: false
          }
      };
  }
}