import * as _ from '@antv/util';
import { getComponent } from '../../components/factory';
import { ElementOption, Label } from '../../interface/config';
import BaseColumn, { ColumnConfig } from '../column';
import './component/label/stackColumn-label';

export interface StackColumnConfig extends ColumnConfig {
  stackField: string;
}

export default class StackColumn extends BaseColumn<StackColumnConfig> {
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
}
