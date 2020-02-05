import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import BaseBarLayer, { BarViewConfig } from '../bar/layer';
import RangedBarLabel, { RangedBarLabelConfig } from './component/label';

export interface RangedBarViewConfig extends BarViewConfig {
    data: any; // todo: 补上data类型定义
    label: RangedBarLabelConfig
}

export interface RangedBarLayerConfig extends RangedBarViewConfig, LayerConfig {}

export default class RangedBarLayer extends BaseBarLayer<RangedBarLayerConfig> {
  /*public static getDefaultOptions(): Partial<RangedBarViewConfig> {
    return _.deepMix({
    }, super.getDefaultOptions(), {});
  }*/

  public type: string = 'rangedBar';

  public afterRender(){
      if(this.options.label && this.options.label.visible){
          const label = new RangedBarLabel({
              view: this.view,
              plot: this,
              ...this.options.label
          });
          label.render();
      }
      super.afterRender();
  }

  protected extractLabel(){}
}

registerPlotType('rangedBar', RangedBarLayer);