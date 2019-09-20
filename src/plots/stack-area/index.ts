import * as _ from '@antv/util';
import { getComponent } from '../../components/factory';
import { ElementOption, Label } from '../../interface/config';
import BaseArea, { AreaConfig } from '../area';
import './component/label/areaLabel';
import './component/label/lineLabel';


export interface StackAreaConfig extends AreaConfig {
  stackField: string;
}

export default class StackArea extends BaseArea<StackAreaConfig> {

  protected setType() {
    this.type = 'stackArea';
  }

  protected _label() {
    const props = this._initialProps;
    const label = props.label as Label;

    if (label && label.visible === false) {
      this.area.label = false;
      return;
    }
    const labelType = this._getLabelType(label);
    /** label类型为line，即跟随在折线尾部时，设置offset为0 */
    if (labelType === 'areaLine' || labelType === 'area') {
      label.offset = 0;
    }
    this.area.label = getComponent('label', {
        fields: [this._getLabelField(labelType, props)],
        labelType,
        plot: this,
        ...label
    });
  }

  protected _adjustArea(ele: ElementOption) {
    ele.adjust = [
      {
        type: 'stack',
      },
    ];
  }

  protected _adjustLine(ele: ElementOption) {
    ele.adjust = [
      {
        type: 'stack',
      },
    ];
  }

  protected _adjustPoint(ele: ElementOption) {
    ele.adjust = [
      {
        type: 'stack',
      },
    ];
  }

  private _getLabelField(type,props){
    const mapper = {
      'point': props.xField,
      'areaLine': props.stackField,
      'area': props.stackField
    };
    return mapper[type];
  }

  private _getLabelType(labelProps){
    if(!labelProps.type){
      return 'area';
    }
    if(labelProps.type === 'line'){
      return 'areaLine';
    }
    return labelProps.type;
  }

}
