import { deepMix, each } from '@antv/util';
import ViewLayer from '../../base/view-layer';
import BaseComponent, { BaseComponentConfig } from '../base';
import { IGroup, IShape, View, Geometry, Element, Coordinate, VIEW_LIFE_CIRCLE } from '../../dependents';
import { Label, IStyleConfig } from '../../interface/config';

export interface LabelComponentConfig extends BaseComponentConfig {
  layer: ViewLayer;
  geometry: Geometry;
  label: Label;
}

export interface LabelOptions extends Label {}

export interface LabelComponentCtor<T extends LabelComponentConfig = LabelComponentConfig> {
  new (config: T): LabelComponent;
}

export default abstract class LabelComponent extends BaseComponent<LabelComponentConfig> {
  protected layer: ViewLayer;
  protected view: View;
  protected geometry: Geometry;
  protected coord: Coordinate;
  protected options: LabelOptions;
  protected labels: IShape[];

  public getGeometry() {
    return this.geometry;
  }

  public getLabels() {
    return this.labels;
  }

  public show() {
    this.container.show();
  }

  public hide() {
    this.container.hide();
  }

  protected init(config: LabelComponentConfig) {
    this.layer = config.layer;
    this.view = this.layer.view;
    this.geometry = config.geometry;
    this.coord = this.view.getCoordinate();
    this.options = deepMix(this.getDefaultOptions(), config.label);

    this.view.on(VIEW_LIFE_CIRCLE.AFTER_PAINT, () => {
      this.clear();
      this.render();
    });
  }

  protected renderInner(group: IGroup) {
    this.labels = [];
    each(this.geometry.elements, (element: Element, idx: number) => {
      const label = this.drawLabelItem(group, element, idx);
      label.set('origin', element.getData());
      this.labels.push(label);
      this.adjustLabel(label, element);
    });
  }

  protected drawLabelText(group: IGroup, attrs: IStyleConfig): IShape {
    return group.addShape('text', {
      attrs,
      name: 'label',
    });
  }

  protected getDefaultOptions(): Partial<LabelOptions> {
    return {};
  }

  protected abstract getLabelItemConfig(element: Element, idx: number): IStyleConfig;

  protected drawLabelItem(group: IGroup, element: Element, idx: number): IShape {
    const config = this.getLabelItemConfig(element, idx);
    return this.drawLabelText(group, config);
  }

  protected adjustLabel(label: IShape, element: Element): void {}
}

// Label 组件注册
const LABEL_CONFIG_MAP: Record<string, LabelComponentCtor> = {};

export function registerLabelComponent(type: string, component: LabelComponentCtor) {
  LABEL_CONFIG_MAP[type] = component;
}

export function getLabelComponent(type: string): LabelComponentCtor {
  return LABEL_CONFIG_MAP[type];
}
