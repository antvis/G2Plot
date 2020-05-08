import { clamp, deepMix } from '@antv/util';
import BaseComponent, { BaseComponentConfig } from './base';
import { GM, Wheel, GestureEvent, IElement, IGroup, IShape, GraphicEvent } from '../dependents';
import { TextStyle, GraphicStyle } from '../interface/config';
import { translate } from '../util/g-util';
import { getEllipsisText } from '../util/text';
import BBox from '../util/bbox';

export interface IndicatorItemItemValue {
  /** 数值项名称，可选 */
  name?: string;
  /** 数值项数值 */
  value: string | number;
  /** 数值项名称和数值是否换行，默认否 */
  wrapLine?: boolean;
}

/** 指标卡每一项数据 */
export interface IndicatorItem {
  /** 标识符 */
  id: string;
  /** Marker 颜色 */
  color: string;
  /** 标题 */
  title: string;
  /** 数值项配置：指标卡一项可以拥有多项数值配置项 */
  values: IndicatorItemItemValue[];
}

/** 指标卡组件配置项 */
export interface TooltipIndicatorRawConfig {
  /** 位置信息 */
  readonly x?: number;
  readonly y?: number;
  readonly width?: number;
  readonly height?: number;
  /** 数据项 */
  readonly items?: IndicatorItem[];
  /** 选中的数据项 ID */
  readonly selectedItem?: string;
  /** 指标卡标题 */
  readonly title?: {
    text?: string;
    spacingY?: number;
    style?: TextStyle;
    activeStyle?: TextStyle;
    inactiveStyle?: TextStyle;
    selectedStyle?: TextStyle;
  };
  /** marker 配置 */
  readonly line?: {
    spacingX?: number;
    width?: number;
    style?: GraphicStyle;
    activeStyle?: GraphicStyle;
    inactiveStyle?: GraphicStyle;
    selectedStyle?: GraphicStyle;
  };
  /** 指标卡每一项的标题配置 */
  itemTitle?: {
    spacingX?: number;
    spacingY?: number;
    style?: TextStyle;
    activeStyle?: TextStyle;
    inactiveStyle?: TextStyle;
    selectedStyle?: TextStyle;
  };
  /** 数值项名称配置 */
  itemName?: {
    spacingX?: number;
    spacingY?: number;
    style?: TextStyle;
    activeStyle?: TextStyle;
    inactiveStyle?: TextStyle;
    selectedStyle?: TextStyle;
  };
  /** 数值配置 */
  itemValue?: {
    spacingX?: number;
    spacingY?: number;
    style?: TextStyle;
    activeStyle?: TextStyle;
    inactiveStyle?: TextStyle;
    selectedStyle?: TextStyle;
  };
  itemBackground?: {
    style?: GraphicStyle;
  };
  /** 每一项间距 */
  itemSpacing?: number;
  /** 每一项最小宽度 */
  minItemWidth?: number;
  /** 每一项最大宽度 */
  maxItemWidth?: number;
  /** G2Plot 主题配置 */
  theme?: any;
}

interface TooltipIndicatorConfig extends TooltipIndicatorRawConfig, BaseComponentConfig {}

export enum ELEMENT_NAMES {
  TOOLTIP_INDICATOR_TITLE = 'tooltip_indicator-title',
  TOOLTIP_INDICATOR_BODY = 'tooltip_indicator-body',
  TOOLTIP_INDICATOR_ITEM_GROUP = 'tooltip_indicator-item-group',
  TOOLTIP_INDICATOR_ITEM_BACKGROUND = 'tooltip_indicator-item-background',
  TOOLTIP_INDICATOR_ITEM_LINE = 'tooltip_indicator-item-line',
  TOOLTIP_INDICATOR_ITEM_TITLE = 'tooltip_indicator-item-title',
  TOOLTIP_INDICATOR_ITEM_BODY = 'tooltip_indicator-item-body',
  TOOLTIP_INDICATOR_ITEM_VALUE_GROUP = 'tooltip_indicator-item-value-group',
  TOOLTIP_INDICATOR_ITEM_NAME = 'tooltip_indicator-item-name',
  TOOLTIP_INDICATOR_ITEM_VALUE = 'tooltip_indicator-item-value',
}

export enum EVENTS {
  ON_SELECT_ITEM = 'onSelectItem',
}

enum PADDING {
  LARGE = 12,
  NORMAL = 8,
  SMALL = 4,
}

/** 挂在元素上的数据 */
interface IndicatorItemDelegateObject {
  /** 原始数据 */
  item: IndicatorItem;
  /** item index */
  index: number;
  /** 如果为某一项数值项，则含有 valueIndex */
  valueIndex?: number;
}

const MAX_ITEM_TITLE_WIDTH = 160;

/** 指标卡图例组件 */
export default class TooltipIndicator extends BaseComponent<TooltipIndicatorConfig> {
  private curX = 0;
  private curY = 0;
  private offsetX = 0;
  private scrollWidth = 0;
  private bodyGroup: IGroup;
  private gm: GM;
  private wheel: Wheel;
  private selectedItemId: string;

  public destroy() {
    this.offEvents();
    super.destroy();
  }

  /** 选中某一项 */
  public selectItem(id: string): void {
    this.doSelectItem(id);
  }

  /** 重置选中状态 */
  public resetSelect(): void {
    this.doSelectItem(this.selectedItemId);
  }

  protected init(config: TooltipIndicatorConfig): void {
    const { theme = {} } = config;
    const defaultCfg: TooltipIndicatorRawConfig = {
      x: 0,
      y: 0,
      title: {
        text: '',
        spacingY: PADDING.NORMAL,
        style: {},
      },
      line: {
        spacingX: PADDING.SMALL,
        width: 2,
        style: {},
      },
      itemTitle: {
        spacingX: 0,
        spacingY: PADDING.SMALL,
        style: {},
      },
      itemName: {
        spacingX: PADDING.NORMAL,
        spacingY: PADDING.SMALL,
        style: {},
      },
      itemValue: {
        style: {},
      },
      itemBackground: {
        style: {
          opacity: 0,
          fill: '#000',
        },
      },
      itemSpacing: PADDING.LARGE,
    };
    this.config = deepMix({}, theme?.components?.tooltipIndicator, defaultCfg, config);
    this.selectedItemId = this.config.selectedItem;
  }
  protected renderInner(group: IGroup): void {
    const { items } = this.config;
    const itemGroups: IGroup[] = [];
    this.renderTitle(group);
    this.bodyGroup = group.addGroup({
      name: ELEMENT_NAMES.TOOLTIP_INDICATOR_BODY,
    });
    items?.forEach((item: IndicatorItem, index: number) => {
      itemGroups.push(this.renderItem(this.bodyGroup, item, index));
    });
    this.layoutItems(group);
    this.bindEvents(group);
    this.applyClip(group);
  }

  private renderTitle(group: IGroup): IShape | undefined {
    const { title } = this.config;
    if (title?.text) {
      const shape = group.addShape({
        type: 'text',
        name: ELEMENT_NAMES.TOOLTIP_INDICATOR_TITLE,
        attrs: {
          text: title?.text,
          textAlign: 'left',
          textBaseline: 'top',
          ...(title?.style || {}),
        },
      });
      const bbox = shape.getBBox();
      this.curY += bbox.height;
      this.curY += title.spacingY || 0;
      return shape;
    }
  }

  private renderItem(group: IGroup, item: IndicatorItem, index: number): IGroup {
    const { itemBackground } = this.config;
    const itemGroup = group.addGroup({
      name: ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_GROUP,
      delegateObject: {
        item,
        index,
      },
    });
    const oldX = this.curX;
    const oldY = this.curY;
    const background = itemGroup.addShape({
      name: ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_BACKGROUND,
      type: 'rect',
      attrs: {
        x: this.curX,
        y: this.curY,
        width: 1,
        height: 1,
        ...(itemBackground.style || {}),
      },
    });
    const line = this.renderLine(itemGroup, item);
    this.renderItemTitle(itemGroup, item);
    this.renderItemValues(itemGroup, item);
    const itemGroupBBox = itemGroup.getBBox();
    // update line height
    line.attr({
      y2: line.attr('y1') + itemGroupBBox.height,
    });

    // spacing
    this.curX = oldX + itemGroupBBox.width;
    this.curX += this.config.itemSpacing || 0;

    // update background
    background.attr({
      width: this.curX - oldX - background.attr('lineWidth') * 2,
      height: this.curY - oldY - background.attr('lineWidth') * 2,
    });

    // reset Y
    this.curY = oldY;

    return itemGroup;
  }

  private renderLine(group: IGroup, item: IndicatorItem): IShape {
    const { line } = this.config;
    const width = line.width || 2;
    const attrs = {
      x1: this.curX + width / 2,
      y1: this.curY,
      x2: this.curX + width / 2,
      y2: this.curY,
      lineWidth: width,
      stroke: item.color,
      ...(line?.style || {}),
    };
    const shape = group.addShape({
      name: ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_LINE,
      type: 'line',
      attrs,
    });
    const bbox = shape.getBBox();
    this.curX += bbox.width;
    this.curX += line.spacingX || 0;

    return shape;
  }

  private renderItemTitle(group: IGroup, item: IndicatorItem): IShape {
    const { itemTitle } = this.config;
    const text: string = getEllipsisText(item.title, MAX_ITEM_TITLE_WIDTH, itemTitle.style || {});
    const shape = group.addShape({
      name: ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_TITLE,
      type: 'text',
      attrs: {
        x: this.curX,
        y: this.curY,
        textAlign: 'left',
        textBaseline: 'top',
        text,
        ...(itemTitle.style || {}),
      },
    });
    const bbox = shape.getBBox();
    this.curY += bbox.height;
    this.curY += itemTitle.spacingY || 0;

    return shape;
  }

  private renderItemValues(group: IGroup, item: IndicatorItem): IGroup {
    const itemBodyGroup = group.addGroup({
      name: ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_BODY,
    });
    const oldX = this.curX;
    item.values?.forEach((value: IndicatorItemItemValue, valueIndex: number) => {
      const valueGroup = itemBodyGroup.addGroup({
        name: ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_VALUE_GROUP,
        delegateObject: {
          item,
          valueIndex,
        },
      });
      // reset x
      this.curX = oldX;
      this.renderItemValueName(valueGroup, value);
      this.renderItemValueValue(valueGroup, value);
    });

    this.layoutItemValues(itemBodyGroup);

    return itemBodyGroup;
  }

  private renderItemValueName(group: IGroup, value: IndicatorItemItemValue): IShape | undefined {
    const { itemName } = this.config;
    if (value.name) {
      const shape = group.addShape({
        name: ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_NAME,
        type: 'text',
        attrs: {
          x: this.curX,
          y: this.curY,
          textAlign: 'left',
          textBaseline: 'top',
          text: value.name,
          ...(itemName.style || {}),
        },
      });
      const bbox = shape.getBBox();
      if (value.wrapLine) {
        this.curY += bbox.height;
        this.curY += itemName.spacingY || 0;
      } else {
        this.curX += bbox.width;
        this.curX += itemName.spacingX || 0;
      }

      return shape;
    }
  }

  private renderItemValueValue(group: IGroup, value: IndicatorItemItemValue): IShape {
    const { itemName, itemValue } = this.config;
    const shape = group.addShape({
      name: ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_VALUE,
      type: 'text',
      attrs: {
        x: this.curX,
        y: this.curY,
        textAlign: 'left',
        textBaseline: 'top',
        text: value.value,
        ...(itemValue.style || {}),
      },
    });
    const bbox = shape.getBBox();
    this.curY += bbox.height;
    this.curY += itemName.spacingY || 0;

    return shape;
  }

  private layoutItems(group: IGroup): void {
    const bodyGroup = group.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_BODY)[0];
    const itemGroups = group.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_GROUP);
    if (!bodyGroup || itemGroups.length === 0) {
      return;
    }
    const bodyGroupBBox = bodyGroup.getBBox();
    this.scrollWidth = bodyGroupBBox.width;
  }

  private layoutItemValues(group: IGroup): void {
    const valueGroups = group.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_VALUE_GROUP);
    const valueGroupBBoxes = valueGroups.map((item) => BBox.fromBBoxObject(item.getBBox()));
    const valueShapes = group.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_VALUE);
    const valueShapeBBoxes = valueShapes.map((shape) => BBox.fromBBoxObject(shape.getBBox()));
    const maxX = Math.max(...valueShapeBBoxes.map((bbox) => bbox.maxX));

    valueGroups.forEach((valueGroup: IGroup, index: number) => {
      const bbox = valueGroupBBoxes[index];
      const nameShape = valueGroup.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_NAME)[0];
      const valueShape = valueGroup.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_VALUE)[0];
      if (nameShape && valueShape) {
        const nameShapeBBox = BBox.fromBBoxObject(nameShape.getBBox());
        const valueShapeBBox = BBox.fromBBoxObject(valueShape.getBBox());
        // horizontal align: name & value
        if (nameShapeBBox.height < bbox.height) {
          nameShape.attr('y', nameShape.attr('y') + (bbox.height - nameShapeBBox.height) / 2);
        }
        if (valueShapeBBox.height < bbox.height) {
          valueShape.attr('y', valueShape.attr('y') + (bbox.height - valueShapeBBox.height) / 2);
        }
        // vertical align values
        if (valueShapeBBox.maxX < maxX) {
          valueShape.attr('x', valueShape.attr('x') + maxX - valueShapeBBox.maxX);
        }
      }
    });
  }

  private applyClip(group: IGroup) {
    const { x, y, width, height } = this.config;
    const bbox = group.getBBox();

    if (width || height) {
      group.setClip({
        type: 'rect',
        attrs: {
          x,
          y,
          width: width || bbox.width,
          height: height || bbox.height,
        },
      });
    }
  }

  private doSelectItem(id: string) {
    const group = this.getGroup();
    const itemGroups = group.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_GROUP);
    if (id !== this.selectedItemId) {
      itemGroups.forEach((itemGroup: IGroup) => {
        const curItemData = itemGroup.get('delegateObject') as IndicatorItemDelegateObject;
        if (curItemData) {
          this.applyItemStyle(itemGroup, curItemData.item.id === id ? 'selected' : 'inactive');
        }
      });
      this.selectedItemId = id;
    } else {
      // 取消选中
      itemGroups.forEach((itemGroup: IGroup) => {
        this.applyItemStyle(itemGroup);
      });
      this.selectedItemId = undefined;
    }
    this.emit(EVENTS.ON_SELECT_ITEM, this.selectedItemId);
  }

  private applyItemStyle(itemGroup: IGroup, state?: 'selected' | 'active' | 'inactive') {
    const { line, itemTitle, itemName, itemValue } = this.config;
    const lineShape = itemGroup.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_LINE)[0];
    const titleShape = itemGroup.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_TITLE)[0];
    const itemNameShapes = itemGroup.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_NAME);
    const itemValueShapes = itemGroup.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_VALUE);
    const styleName = state && `${state}Style`;

    if (lineShape) {
      lineShape.attr(line.style);
      lineShape.attr(line[styleName] || {});
    }
    if (titleShape) {
      titleShape.attr(itemTitle.style);
      titleShape.attr(itemTitle[styleName] || {});
    }
    itemNameShapes.forEach((itemNameShape) => {
      itemNameShape.attr(itemName.style);
      itemNameShape.attr(itemName[styleName] || {});
    });
    itemValueShapes.forEach((itemValueShape) => {
      itemValueShape.attr(itemValue.style);
      itemValueShape.attr(itemValue[styleName] || {});
    });
  }

  private bindEvents(group: IGroup) {
    this.offEvents();
    const bodyGroup = group.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_BODY)[0];
    bodyGroup.on('mousemove', this.onBodyGroupMousemove);
    this.addDisposable(() => {
      bodyGroup.off('mousemove', this.onBodyGroupMousemove);
    });
    this.gm = new GM(bodyGroup);
    this.wheel = new Wheel(bodyGroup);
    this.wheel.on('wheel', this.onWheel);
  }

  private offEvents() {
    if (this.gm) {
      this.gm.destroy();
    }
    if (this.wheel) {
      this.wheel.destroy();
    }
  }

  private onBodyGroupMousemove = (evt: GraphicEvent) => {
    const itemGroup = findTargetAncestor(
      evt.target as IElement,
      (target: IElement) => target.get('name') === ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_GROUP
    );
    if (itemGroup) {
      const itemData = itemGroup.get('delegateObject') as IndicatorItemDelegateObject;
      this.doSelectItem(itemData.item.id);
    }
  };

  private onWheel = (evt: GestureEvent) => {
    const { width = 0 } = this.config;
    const { deltaX } = evt;
    const newOffsetX = clamp(this.offsetX + deltaX, -this.scrollWidth + width / 2, this.scrollWidth - width / 2);
    if (newOffsetX !== this.offsetX) {
      this.offsetX = newOffsetX;
      translate(this.bodyGroup, -deltaX, 0);
    }
  };
}

function findTargetAncestor(element: IElement, predicate: (target: IElement) => boolean): IElement | undefined {
  let cur = element;
  while (cur) {
    if (predicate(cur)) {
      return cur;
    }
    cur = cur.getParent();
  }
}
