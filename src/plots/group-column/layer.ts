import { registerPlotType } from '../../base/global';
import { ElementOption } from '../../interface/config';
import BaseColumnLayer, { ColumnLayerConfig } from '../column/layer';

export interface GroupColumnLayerConfig extends ColumnLayerConfig {
  groupField: string;
}

export default class GroupColumnLayer extends BaseColumnLayer<GroupColumnLayerConfig> {
  public type: string = 'groupColumn';
  public getResponsiveTheme() {
    return this.themeController.getResponsiveTheme('column');
  }

  protected addGeometry() {
    super.addGeometry();
  }

  protected adjustColumn(column: ElementOption) {
    column.adjust = [
      {
        type: 'dodge',
        marginRatio: 0.1,
      },
    ];
  }
}

registerPlotType('groupColumn', GroupColumnLayer);
