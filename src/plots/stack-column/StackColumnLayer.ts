import * as _ from '@antv/util';
import ConnectedArea from '../../components/connectedArea';
import { getComponent } from '../../components/factory';
import { ElementOption, Label } from '../../interface/config';
import BaseColumnLayer, { ColumnLayerConfig } from '../column/ColumnLayer';
import './component/label/stackColumn-label';

export interface StackColumnLayerConfig extends ColumnLayerConfig {
  stackField: string;
  connectedArea?: any;
}

export default class StackColumnLayer extends BaseColumnLayer<StackColumnLayerConfig> {
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
    const props = this.initialProps;

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

  protected afterRender() {
    const props = this.initialProps;
    // 绘制区域连接组件
    if (props.connectedArea && props.connectedArea.visible) {
      this.connectedArea = new ConnectedArea({
        view: this.plot,
        field: props.stackField,
        animation: props.animation === false ? false : true,
        ...props.connectedArea,
      });
    }
    super.afterRender();
  }
}
