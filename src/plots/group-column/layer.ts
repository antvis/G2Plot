import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { ElementOption } from '../../interface/config';
import BaseColumnLayer, { ColumnViewConfig } from '../column/layer';

export interface GroupColumnViewConfig extends ColumnViewConfig {
  groupField: string;
}

export interface GroupColumnLayerConfig extends GroupColumnViewConfig, LayerConfig {}

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
