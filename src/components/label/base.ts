import { deepMix, each, map, isArray, get, clone } from '@antv/util';
import ViewLayer from '../../base/view-layer';
import BaseComponent, { BaseComponentConfig } from '../base';
import {
  IGroup,
  IShape,
  View,
  Geometry,
  Element,
  Coordinate,
  MappingDatum,
  VIEW_LIFE_CIRCLE,
  getDefaultAnimateCfg,
  doAnimate,
  ORIGIN,
} from '../../dependents';
import { Label, TextStyle } from '../../interface/config';
import { LooseMap } from '../../interface/types';

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
  private labelsCfgMap: Record<string, TextStyle> = {};
  private lastLabelsCfgMap: Record<string, TextStyle> = {};

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
    const view = this.layer.view;
    this.view = view;
    this.geometry = config.geometry;
    this.coord = view.getCoordinate();
    this.options = deepMix(this.getDefaultOptions(), config.label);

    const callback = () => {
      this.clear();
      this.render();
    };
    view.on(VIEW_LIFE_CIRCLE.AFTER_PAINT, callback);
    this.addDisposable(() => {
      view.off(VIEW_LIFE_CIRCLE.AFTER_PAINT, callback);
    });
  }

  protected renderInner(group: IGroup) {
    this.labels = [];
    this.labelsCfgMap = {};

    // 绘制 Label 图形
    each(this.geometry.elements, (element: Element, elementIdx: number) => {
      const labels = [].concat(this.drawLabelItem(group, element, elementIdx));
      each(labels, (label, idx) => {
        this.adjustLabel(label, element, idx);
        if (!label.destroyed) {
          this.labels.push(label);
          this.labelsCfgMap[label.get('id')] = clone(label.attrs);
        }
      });
    });

    // 执行布局
    this.layoutLabels(this.geometry, this.labels);

    // 执行动画：参照 G2 Label 动画
    const lastLabelsCfgMap = this.lastLabelsCfgMap;
    const labelsCfgMap = this.labelsCfgMap;
    const animateCfg = this.geometry.animateOption ? getDefaultAnimateCfg('label', this.coord) : false;
    each(labelsCfgMap, (attrs: TextStyle, id: string) => {
      const shape = group.findById(id) as IShape;
      if (shape) {
        if (lastLabelsCfgMap[id]) {
          const oldAttrs = lastLabelsCfgMap[id];
          // 图形发生更新
          const updateAnimateCfg = get(animateCfg, 'update');
          if (updateAnimateCfg) {
            shape.attr(oldAttrs);
            doAnimate(shape, updateAnimateCfg, {
              toAttrs: {
                ...attrs,
              },
              coordinate: this.coord,
            });
          }
        } else {
          // 新生成的 shape
          const appearAnimateCfg = get(animateCfg, 'appear');
          if (appearAnimateCfg) {
            doAnimate(shape, appearAnimateCfg, {
              toAttrs: {
                ...shape.attr(),
              },
              coordinate: this.coord,
            });
          }
        }
      }
      delete lastLabelsCfgMap[id];
    });
    each(lastLabelsCfgMap, (attrs: TextStyle, id) => {
      // 移除
      const leaveAnimateCfg = get(animateCfg, 'leave');
      if (leaveAnimateCfg) {
        const tempShape = group.addShape('text', {
          attrs,
          id,
          name: 'label',
        });
        doAnimate(tempShape, leaveAnimateCfg, {
          toAttrs: null,
          coordinate: this.coord,
        });
      }
    });
    this.lastLabelsCfgMap = this.labelsCfgMap;
  }

  protected drawLabelText(group: IGroup, attrs: TextStyle, extraCfgs: LooseMap = {}): IShape {
    return group.addShape('text', {
      attrs,
      ...extraCfgs,
    });
  }

  protected drawLabelItem(group: IGroup, element: Element, elementIndex: number): IShape | IShape[] {
    const model = element.getModel();
    const items = [].concat(this.getLabelItemAttrs(element, elementIndex));
    const offset = this.getDefaultOffset();
    const offsetPoint = this.getLabelOffset();
    return map(items, (attrs, index) => {
      const position = {
        x: attrs.x + offsetPoint.x,
        y: attrs.y + offsetPoint.y,
      };
      const dataItem = isArray(model.mappingData) ? model.mappingData[index] : model.mappingData;
      const id = this.getLabelId(dataItem);
      return this.drawLabelText(
        group,
        { ...attrs, ...position },
        {
          id,
          name: 'label',
          offset,
          [ORIGIN]: dataItem,
        }
      );
    });
  }

  /** 获取当前 Label 的 offset */
  protected getDefaultOffset() {
    return Number(this.options.offset);
  }

  /** 获取当前 Label 的 offset 点：包括 offset、offsetX、offsetY */
  protected getLabelOffset() {
    const { offsetX, offsetY } = this.options;
    const transposed = this.coord.isTransposed;
    const offset = this.getDefaultOffset();
    const dim = transposed ? 'x' : 'y';
    const factor = transposed ? 1 : -1; // y 方向上越大，像素的坐标越小，所以transposed时将系数变成
    const offsetPoint = {
      x: 0,
      y: 0,
    };
    offsetPoint[dim] = offset * factor;
    if (offsetX) {
      offsetPoint.x += offsetX;
      offsetPoint.y += offsetY;
    }
    return offsetPoint;
  }

  /** 初始化默认全局配置 */
  protected getDefaultOptions(): Partial<LabelOptions> {
    return {};
  }

  /** 获取绘制当前 Label 的属性配置 */
  protected abstract getLabelItemAttrs(element: Element, idx: number): TextStyle | TextStyle[];

  /** 在当前 Label 绘制之后的调整 */
  protected abstract adjustLabel(label: IShape, element: Element, datumIdx: number): void;

  /** 整理对所有 Labels 的布局调整 */
  // eslint-disable-next-line
  protected layoutLabels(geometry: Geometry, labels: IShape[]): void {
    // empty
  }

  protected getLabelId(data: MappingDatum): string {
    const origin = data._origin;
    const type = this.geometry.type;
    const xScale = this.geometry.getXScale();
    const yScale = this.geometry.getYScale();
    let labelId = this.geometry.getElementId(data);
    if (type === 'line' || type === 'area') {
      // 折线图以及区域图，一条线会对应一组数据，即多个 labels，为了区分这些 labels，需要在 line id 的前提下加上 x 字段值
      labelId += ` ${origin[xScale.field]}`;
    } else if (type === 'path') {
      // path 路径图，无序，有可能存在相同 x 不同 y 的情况，需要通过 x y 来确定唯一 id
      labelId += ` ${origin[xScale.field]}-${origin[yScale.field]}`;
    }

    return labelId;
  }
}

// Label 组件注册
const LABEL_CONFIG_MAP: Record<string, LabelComponentCtor> = {};

export function registerLabelComponent(type: string, component: LabelComponentCtor) {
  LABEL_CONFIG_MAP[type] = component;
}

export function getLabelComponent(type: string): LabelComponentCtor {
  return LABEL_CONFIG_MAP[type];
}
