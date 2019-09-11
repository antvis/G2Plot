import { ElementOption } from '../../interface/config';
import BaseBar, { BarConfig } from '../bar';

export interface GroupBarConfig extends BarConfig {
  groupField: string;
}

export default class GroupBar extends BaseBar<GroupBarConfig> {

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
