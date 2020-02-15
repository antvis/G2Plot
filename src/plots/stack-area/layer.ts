import * as _ from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { ElementOption, Label } from '../../interface/config';
import BaseArea, { AreaViewConfig } from '../area/layer';
import LineLabel from './component/label/line-label';
import AreaLabel from './component/label/area-label';

export interface StackAreaViewConfig extends AreaViewConfig {
  stackField: string;
}

export interface StackAreaLayerConfig extends StackAreaViewConfig, LayerConfig {}

export default class StackAreaLayer<T extends StackAreaLayerConfig = StackAreaLayerConfig> extends BaseArea<T> {
  public static getDefaultOptions(): any {
    return _.deepMix({}, super.getDefaultOptions(), {
      label: {
        visible: false,
        type: 'area',
      },
    });
  }

  public type: string = 'stackArea';

  protected label() {}

  protected adjustArea(ele: ElementOption) {
    ele.adjust = [
      {
        type: 'stack',
      },
    ];
  }

  protected adjustLine(ele: ElementOption) {
    ele.adjust = [
      {
        type: 'stack',
      },
    ];
  }

  protected adjustPoint(ele: ElementOption) {
    ele.adjust = [
      {
        type: 'stack',
      },
    ];
  }

  public afterRender() {
    const props = this.options;
    const visible = _.get(this.options, ['label', 'visible']);
    const type = _.get(this.options, ['label', 'type']);

    if (visible && type === 'line') {
      const label = new LineLabel({
        view: this.view,
        plot: this,
        ...this.options.label,
      });

      label.render();
    }

    if (visible && type === 'area') {
      const label = new AreaLabel({
        view: this.view,
        plot: this,
        ...this.options.label,
      });

      label.render();
    }

    props.responsive = false;
    super.afterRender();
  }
}

registerPlotType('stackArea', StackAreaLayer);
