import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { getComponent } from '../../components/factory-refactor';
import { ElementOption, Label } from '../../interface/config';
import BaseArea, { AreaLayerConfig } from '../area/layer-refactor';
import './component/label/area-label';
import './component/label/line-label';

export interface StackAreaLayerConfig extends AreaLayerConfig {
    stackField: string;
}

export default class StackAreaLayer extends BaseArea<StackAreaLayerConfig> {

    public static getDefaultOptions(): any {
        return _.deepMix({}, super.getDefaultOptions(), {
            label: {
                visible: false,
                type: 'area',
            },
        });
    }

    public type: string = 'stackArea';
 
    protected label() {
      const props = this.options;
      const label = props.label as Label;
  
      if (label && label.visible === false) {
        this.area.label = false;
        return;
      }
      const labelType = this.getLabelType(label);
      /** label类型为line，即跟随在折线尾部时，设置offset为0 */
      if (labelType === 'areaLine' || labelType === 'area') {
        label.offset = 0;
      }
  
      this.area.label = getComponent('label', {
        fields: [this.getLabelField(labelType, props)],
        labelType,
        plot: this,
        ...label,
      });
    }
  
    protected adjustArea(ele: ElementOption) {
      ele.adjust = [
        {
          type: 'stack',
        },
      ];
    }
  
    protected adjustLine(ele: ElementOption) {
      ele.adjust = [
        {
          type: 'stack',
        },
      ];
    }
  
    protected adjustPoint(ele: ElementOption) {
      ele.adjust = [
        {
          type: 'stack',
        },
      ];
    }
  
    private getLabelField(type, props) {
      const mapper = {
        point: props.xField,
        areaLine: props.stackField,
        area: props.stackField,
      };
      return mapper[type];
    }
  
    private getLabelType(labelProps) {
      if (labelProps.type === 'line') {
        return 'areaLine';
      }
      return labelProps.type;
    }
  }
  
registerPlotType('stackArea', StackAreaLayer);