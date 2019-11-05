import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { ElementOption } from '../../interface/config';
import BaseBarLayer, { BarLayerConfig } from '../bar/layer-refactor';

export interface GroupBarLayerConfig extends BarLayerConfig {
    groupField: string;
}

export default class GroupBarLayer extends BaseBarLayer<GroupBarLayerConfig> {
    public type: string = 'groupBar';
  
    protected adjustBar(bar: ElementOption) {
      bar.adjust = [
        {
          type: 'dodge',
        },
      ];
    }
}

registerPlotType('groupBar', GroupBarLayer);