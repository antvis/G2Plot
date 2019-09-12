import * as _ from '@antv/util';
import  ConnectedArea from  '../../components/connectedArea';
import { getComponent } from '../../components/factory';
import { ElementOption, Label } from '../../interface/config';
import BaseColumn, { ColumnConfig } from '../column';
import './component/label/stackColumn-label';

export interface StackColumnConfig extends ColumnConfig {
  stackField: string;
  connectedArea?: any;
}

export default class StackColumn extends BaseColumn<StackColumnConfig> {
  public connectedArea: any;

  protected setType() {
    this.type = 'stackColumn';
  }

  protected _adjustColumn(column: ElementOption) {
    column.adjust = [
      {
        type: 'stack',
      },
    ];
  }

  protected _extractLabel() {
    const props = this._initialProps;

    const label = props.label as Label;
    if (!label.position) {
      label.position = 'middle';
    }

    if (label && label.visible === false) {
      return false;
    }

    const labelConfig = getComponent('label', {
      plot: this,
      labelType: 'stackColumnLabel',
      fields: [props.yField],
      ...label,
    });

    return labelConfig as any;
  }

  protected _afterRender(){
    const props = this._initialProps;
    // 绘制区域连接组件
    if(props.connectedArea && props.connectedArea.visible){
      this.connectedArea = new ConnectedArea({
        view: this.plot,
        field: props.stackField,
        animation: props.animation === false ? false : true,
        ...props.connectedArea
      });
    }
    super._afterRender();
  }

}
