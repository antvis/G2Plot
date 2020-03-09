import { deepMix, get, each } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { ElementOption, Label } from '../../interface/config';
import BaseArea, { AreaViewConfig } from '../area/layer';
import { getPlotComponents } from './component';

interface IAreaLabel  extends Label {
  autoScale?:boolean;
}

export interface StackedAreaViewConfig extends AreaViewConfig {
  stackField: string;
  label: IAreaLabel;
}

export interface StackedAreaLayerConfig extends StackedAreaViewConfig, LayerConfig {}

export default class StackedAreaLayer<T extends StackedAreaLayerConfig = StackedAreaLayerConfig> extends BaseArea<T> {
  protected plotComponents: any[] = [];

  public static getDefaultOptions(): any {
    return deepMix({}, super.getDefaultOptions(), {
      label: {
        visible: false,
        type: 'area',
      },
    });
  }

  public type: string = 'stackedArea';

  public beforeInit() {
    const visible = get(this.options, ['label', 'visible']);
    const type = get(this.options, ['label', 'type']);
    const options: any = this.options;
    if (visible) {
      if (type === 'line') {
        options.lineLabel = this.options.label;
      }
      if (type === 'area') {
        options.areaLabel = this.options.label;
      }
    }
    super.beforeInit();
  }

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
    this.renderPlotComponents();
    this.options.responsive = false;
    super.afterRender();
  }

  protected renderPlotComponents() {
    const componentsType = ['areaLabel', 'lineLabel'];
    each(componentsType, (t) => {
      const cfg = {
        view: this.view,
        plot: this,
        ...this.options[t],
      };
      const component = getPlotComponents(this, t, cfg);
      if (component) {
        component.render();
        this.plotComponents.push(component);
      }
    });
  }
}

registerPlotType('stackedArea', StackedAreaLayer);
