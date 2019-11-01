import * as _ from '@antv/util';
import { ElementOption } from '../../interface/config';
import BaseBarLayer, { BarLayerConfig } from '../bar/layer';

export interface GroupBarLayerConfig extends BarLayerConfig {
  groupField: string;
}

export default class GroupBarLayer extends BaseBarLayer<GroupBarLayerConfig> {
  protected setType() {
    this.type = 'groupBar';
  }

  protected _adjustBar(bar: ElementOption) {
    bar.adjust = [
      {
        type: 'dodge',
      },
    ];
  }
}
