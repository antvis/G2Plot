import { deepMix, get, each } from '@antv/util';
import { registerPlotType } from '../../base/global';
import { LayerConfig } from '../../base/layer';
import { ElementOption, Label } from '../../interface/config';
import BaseArea from '../area/layer';
import { getPlotComponents } from './component';
import './component/label/area-point';
import './component/label/area-point-auto';
import { StackedAreaViewConfig } from './interface';
import './theme';

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
  public baseType: string = 'area';

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

  public getColorScale() {
    const { stackField } = this.options;
    return this.view.getScaleByField(stackField);
  }

  protected label() {
    const props = this.options;
    const label = props.label as Label;

    if (label && label.visible === false) {
      if (this.line) {
        this.line.label = false;
      }
      if (this.point) {
        this.point.label = false;
      }
      this.area.label = false;
      return;
    }
  }

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

  protected geometryTooltip() {
    this.area.tooltip = {};
    const tooltipOptions: any = this.options.tooltip;
    if (tooltipOptions.fields) {
      this.area.tooltip.fields = tooltipOptions.fields;
    }
    if (tooltipOptions.formatter) {
      this.area.tooltip.callback = tooltipOptions.formatter;
      if (!tooltipOptions.fields) {
        this.area.tooltip.fields = [this.options.xField, this.options.yField, this.options.stackField];
      }
    }
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
