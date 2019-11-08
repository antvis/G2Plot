import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { ElementOption } from '../../interface/config';
import BaseBarLayer, { BarViewConfig } from '../bar/layer';

export interface GroupBarViewConfig extends BarViewConfig {
  groupField: string;
}

export interface GroupBarLayerConfig extends GroupBarViewConfig, LayerConfig {}

export default class GroupBarLayer extends BaseBarLayer<GroupBarLayerConfig> {
  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
      label: {
        visble: false,
        position: 'right',
        offset: 8,
        adjustColor: true,
      },
      legend: {
        visble: true,
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
