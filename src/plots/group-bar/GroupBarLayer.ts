import { ElementOption } from '../../interface/config';
import BaseBarLayer, { BarLayerConfig } from '../bar/BarLayer';

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
