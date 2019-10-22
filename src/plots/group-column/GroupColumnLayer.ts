import { ElementOption } from '../../interface/config';
import BaseColumnLayer, { ColumnLayerConfig } from '../column/ColumnLayer';

export interface GroupColumnLayerConfig extends ColumnLayerConfig {
  groupField: string;
}

export default class GroupColumnLayer extends BaseColumnLayer<GroupColumnLayerConfig> {
  // fixme: groupColumn Responsive未注册
  public getResponsiveTheme() {
    return this.themeController.getResponsiveTheme('column');
  }
  protected setType() {
    this.type = 'groupColumn';
  }

  protected _adjustColumn(column: ElementOption) {
    column.adjust = [
      {
        type: 'dodge',
      },
    ];
  }
}
