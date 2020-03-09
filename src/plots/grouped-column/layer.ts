import { deepMix } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { ElementOption } from '../../interface/config';
import BaseColumnLayer, { ColumnViewConfig } from '../column/layer';

export interface GroupedColumnViewConfig extends ColumnViewConfig {
  groupField: string;
}

export interface GroupedColumnLayerConfig extends GroupedColumnViewConfig, LayerConfig {}

export default class GroupedColumnLayer extends BaseColumnLayer<GroupedColumnLayerConfig> {
  public static getDefaultOptions(): Partial<GroupedColumnViewConfig> {
    return deepMix({}, super.getDefaultOptions(), {
      yAxis: {
        title: {
          visible: true,
        },
      },
    });
  }
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

registerPlotType('groupedColumn', GroupedColumnLayer);
