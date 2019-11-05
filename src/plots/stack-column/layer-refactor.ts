import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import ConnectedArea from '../../components/connected-area';
import { getComponent } from '../../components/factory-refactor';
import { ElementOption, Label } from '../../interface/config';
import BaseColumnLayer, { ColumnLayerConfig } from '../column/layer-refactor';
import './component/label/stack-column-label';

export interface StackColumnLayerConfig extends ColumnLayerConfig {
    stackField: string;
    connectedArea?: any;
}

export default class StackColumnLayer extends BaseColumnLayer<StackColumnLayerConfig> {
    public static getDefaultOptions() {
      return _.deepMix({}, super.getDefaultOptions(), {
        label: {
          visible: false,
          position: 'middle',
        },
        connectedArea: {
          visible: false,
          triggerOn: 'mouseenter',
        },
      });
    }

    public type: string = 'stackColum';
    public connectedArea: any;

    public afterRender() {
        const props = this.options;
        // 绘制区域连接组件
        if (props.connectedArea.visible) {
          this.connectedArea = new ConnectedArea({
            view: this.view,
            field: props.stackField,
            animation: props.animation === false ? false : true,
            ...props.connectedArea,
          });
        }
        super.afterRender();
      }
  
    protected adjustColumn(column: ElementOption) {
      column.adjust = [
        {
          type: 'stack',
        },
      ];
    }
  
    protected extractLabel() {
      const props = this.options;
  
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

  registerPlotType('stackColumn',StackColumnLayer);
  