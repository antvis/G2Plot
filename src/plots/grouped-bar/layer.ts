import { deepMix, valuesOfKey, clone } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { ElementOption, timeIntervals } from '../../interface/config';
import BaseBarLayer, { BarViewConfig } from '../bar/layer';

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
        offset: 8,
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
    const names = valuesOfKey(this.options.data, this.options.groupField);
    this.view.on('tooltip:change', (e) => {
      const { items } = e;
      const origin_items = clone(items);
      for (let i = 0; i < names.length; i++) {
        const name = names[i];
        for (let j = 0; j < origin_items.length; j++) {
          const item = origin_items[j];
          if (item.name === name) {
            e.items[i] = item;
          }
        }
      }
    });
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
}

registerPlotType('groupedBar', GroupedBarLayer);
