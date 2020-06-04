import { deepMix } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { ElementOption } from '../../interface/config';
import BaseColumnLayer from '../column/layer';
import { ColumnViewConfig } from '../column/interface';
import './theme';

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
  public type: string = 'groupedColumn';

  public getColorScale() {
    const { groupField } = this.options;
    if (groupField) {
      return this.view.getScaleByField(groupField);
    }
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

  protected geometryTooltip() {
    this.column.tooltip = {};
    const tooltipOptions: any = this.options.tooltip;
    if (tooltipOptions.fields) {
      this.column.tooltip.fields = tooltipOptions.fields;
    }
    if (tooltipOptions.formatter) {
      this.column.tooltip.callback = tooltipOptions.formatter;
      if (!tooltipOptions.fields) {
        this.column.tooltip.fields = [this.options.xField, this.options.yField, this.options.groupField];
      }
    }
  }
}

registerPlotType('groupedColumn', GroupedColumnLayer);
