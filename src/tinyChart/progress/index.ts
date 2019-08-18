import * as _ from '@antv/util';
import TinyPlot,{ TinyConfig } from '../tinyPlot';
import { getGeom } from '../../geoms/factory';

interface TinyProgressCfg extends TinyConfig {
    stackField?:number;
}

export default class Progress extends TinyPlot<TinyProgressCfg> {
 
  protected _beforeInit() {
    super._beforeInit();
    this.processData();
    this.processProps();
    this.type = 'tinyProgress';
  }

  protected _coord() {
    const coordConfig = {
      actions: [
        [ 'transpose' ],
      ],
    };
    this._setConfig('coord', coordConfig);
  }


  protected _addElements() {
    const props = this._initialProps;
    const bar = getGeom('interval', 'main', {
      positionFields: [ props.yField, props.xField ],
      plot: this,
    });
    bar.adjust = [ {
        type: 'stack',
    } ];
    this._setConfig('element', bar);
  }

  private processData() {
      const props = this._initialProps;
      const data = [
          {type:'current', value: props.percent},
          {type:'rest', value: 1.0 - props.percent},
      ];
      props.data = data;
  }

  /**
   * 将进度条配置项转为堆叠条形图配置项
   */
  public processProps(){
      this._getSize();
      let props = this._initialProps;
      const cfg = {
          padding: [0,0,0,0],
          xField: 'value',
          yField: '1',
          stackField: 'type',
          barSize: this._getSize(),
          color: props.color || [ '#55A6F3', '#E8EDF3' ]
      } as any;
      props = _.mix(props,cfg);
  }

  private _getSize(){
      const height = this.canvasController.height;
      if(height>=50) return 10;
      return 4;
  }

  public update(value){
    const props = this._initialProps;
    props.percent = value;
    this.processData();
    this.changeData(props.data);
  };
  
}