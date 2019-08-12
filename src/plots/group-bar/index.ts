import BaseBar, { BarConfig } from '../bar';
import { ElementOption } from '../../interface/config';

export interface GroupBarConfig extends BarConfig {
  groupField: string;
}

export default class GroupBar extends BaseBar<GroupBarConfig> {
  protected _adjustBar(bar: ElementOption) {
    bar.adjust = [ {
      type: 'dodge',
    } ];
  }
}
