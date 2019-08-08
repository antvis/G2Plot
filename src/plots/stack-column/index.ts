import BaseColumn, { ColumnConfig } from '../column';
import { ElementOption, Label } from '../../interface/config';
import * as _ from '@antv/util';
import './guide/label/stackColumn-label';
import LabelParser from '../../components/label';

export interface StackColumnConfig extends ColumnConfig {
  stackField: string;
}

export default class StackColumn extends BaseColumn<StackColumnConfig> {

  protected _adjustColumn(column: ElementOption) {
    column.adjust = [ {
      type: 'stack',
    } ];
  }

  protected _extractLabel() {
    const props = this._initialProps;

    const label = props.label as Label;
    if(!label.position) label.position = 'middle';

    if (label && label.visible === false) return false;
  
    const labelConfig = new LabelParser({
      plot:this,
      labelType: 'stackColumnLabel',
      fields: [ props.yField ],
      ...label
    }).config;

    return labelConfig as any;
  }

}
