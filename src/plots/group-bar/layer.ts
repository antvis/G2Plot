import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { ElementOption, timeIntervals } from '../../interface/config';
import BaseBarLayer, { BarViewConfig } from '../bar/layer';

export interface GroupBarViewConfig extends BarViewConfig {
  groupField: string;
}

export interface GroupBarLayerConfig extends GroupBarViewConfig, LayerConfig {}

export default class GroupBarLayer extends BaseBarLayer<GroupBarLayerConfig> {
  public static getDefaultOptions(): Partial<GroupBarViewConfig> {
    return _.deepMix({}, super.getDefaultOptions(), {
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

  public type: string = 'groupBar';

  public afterRender() {
    super.afterRender();
    const names = _.valuesOfKey(this.options.data, this.options.groupField);
    this.view.on('tooltip:change', (e) => {
      const { items } = e;
      const origin_items = _.clone(items);
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
      values: _.valuesOfKey(this.options.data, this.options.groupField),
    };
    if (!this.options.meta) {
      this.options.meta = defaultMeta;
    } else {
      this.options.meta = _.deepMix({}, this.options.meta, defaultMeta);
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

registerPlotType('groupBar', GroupBarLayer);
