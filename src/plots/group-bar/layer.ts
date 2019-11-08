import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { ElementOption } from '../../interface/config';
import BaseBarLayer, { BarLayerConfig } from '../bar/layer';

export interface GroupBarLayerConfig extends BarLayerConfig {
  groupField: string;
}

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
      },
    ];
  }
}

registerPlotType('groupBar', GroupBarLayer);
