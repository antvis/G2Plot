import { deepMix, valuesOfKey, sortBy } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { ElementOption } from '../../interface/config';
import BaseBarLayer from '../bar/layer';
import { BarViewConfig } from '../bar/interface';
import './theme';

export interface GroupedBarViewConfig extends BarViewConfig {
  groupField: string;
}

export interface GroupedBarLayerConfig extends GroupedBarViewConfig, LayerConfig {}

export default class GroupedBarLayer extends BaseBarLayer<GroupedBarLayerConfig> {
  public static getDefaultOptions(): Partial<GroupedBarViewConfig> {
    return deepMix({}, super.getDefaultOptions(), {
      xAxis: {
        visible: true,
        grid: {
          visible: true,
        },
      },
      yAxis: {
        visible: true,
        title: {
          visible: false,
        },
      },
      label: {
        visible: true,
        position: 'right',
        adjustColor: true,
      },
      legend: {
        visible: true,
        position: 'right-top',
        offsetY: 0,
      },
    });
  }

  public type: string = 'groupedBar';

  public afterRender() {
    super.afterRender();
    const names = valuesOfKey(this.options.data, this.options.groupField) || [];
    this.view.on('tooltip:change', (e) => {
      const { items = [] } = e;
      const fixedItems = sortBy(items.slice(), (item) => {
        return names.indexOf(item.name);
      }).reverse();
      fixedItems.forEach((item, idx) => {
        e.items[idx] = item;
      });
    });
  }

  public getColorScale() {
    const { groupField } = this.options;
    if (groupField) {
      return this.view.getScaleByField(groupField);
    }
  }

  protected scale() {
    const defaultMeta = {};
    defaultMeta[this.options.groupField] = {
      values: valuesOfKey(this.options.data, this.options.groupField),
    };
    if (!this.options.meta) {
      this.options.meta = defaultMeta;
    } else {
      this.options.meta = deepMix({}, this.options.meta, defaultMeta);
    }
    super.scale();
  }

  protected adjustBar(bar: ElementOption) {
    bar.adjust = [
      {
        type: 'dodge',
        marginRatio: 0.1,
      },
    ];
  }

  protected geometryTooltip() {
    this.bar.tooltip = {};
    const tooltipOptions: any = this.options.tooltip;
    if (tooltipOptions.fields) {
      this.bar.tooltip.fields = tooltipOptions.fields;
    }
    if (tooltipOptions.formatter) {
      this.bar.tooltip.callback = tooltipOptions.formatter;
      if (!tooltipOptions.fields) {
        this.bar.tooltip.fields = [this.options.xField, this.options.yField, this.options.groupField];
      }
    }
  }
}

registerPlotType('groupedBar', GroupedBarLayer);
