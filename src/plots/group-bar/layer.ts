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
      },
    });
  }

  public type: string = 'groupBar';

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
