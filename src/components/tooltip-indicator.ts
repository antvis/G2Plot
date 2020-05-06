import { clamp, each, deepMix } from '@antv/util';
import { GM, Wheel, GestureEvent } from '@antv/g-gesture';
import BaseComponent, { BaseComponentConfig } from './base';
import { IGroup, IShape } from '../dependents';
import { TextStyle, GraphicStyle } from '../interface/config';
import { translate } from '../util/g-util';

export interface IndicatorItem {
  id: string;
  name: string;
  value: any;
  color: string;
}

export interface TooltipIndicatorConfig extends BaseComponentConfig {
  /** 位置信息 */
  readonly x: number;
  readonly y: number;
  readonly width?: number;
  readonly height?: number;
  /** 数据项 */
  readonly items: IndicatorItem[];
  /** 选中的数据项 */
  readonly selectedItems?: string[];
  /** 标题 */
  readonly title?: {
    text: string;
    spacing?: number;
    style?: TextStyle;
    activeStyle?: TextStyle;
    selectedStyle?: TextStyle;
  };
  /** marker 配置 */
  readonly line?: {
    spacing?: number;
    width?: number;
    style?: GraphicStyle;
    activeStyle?: GraphicStyle;
    selectedStyle?: GraphicStyle;
  };
  /** 名称配置 */
  itemName?: {
    wrapLine?: boolean;
    spacingX?: number;
    spacingY?: number;
    style?: TextStyle;
    activeStyle?: TextStyle;
    selectedStyle?: TextStyle;
  };
  /** 数值配置 */
  itemValue?: {
    spacingX?: number;
    spacingY?: number;
    style?: TextStyle;
    activeStyle?: TextStyle;
    selectedStyle?: TextStyle;
  };
  itemBackground?: {
    style: {};
  };
  /** 每一项间距 */
  itemSpacing?: number;
  /** 每一项最小宽度 */
  minItemWidth?: number;
  /** 每一项最大宽度 */
  maxItemWidth?: number;
}

export enum ELEMENT_NAMES {
  TOOLTIP_INDICATOR_TITLE = 'tooltip_indicator-title',
  TOOLTIP_INDICATOR_BODY = 'tooltip_indicator-body',
  TOOLTIP_INDICATOR_ITEM_GROUP = 'tooltip_indicator-item-group',
  TOOLTIP_INDICATOR_ITEM_BACKGROUND = 'tooltip_indicator-item-background',
  TOOLTIP_INDICATOR_ITEM_LINE = 'tooltip_indicator-item-line',
  TOOLTIP_INDICATOR_ITEM_NAME = 'tooltip_indicator-item-name',
  TOOLTIP_INDICATOR_ITEM_VALUE = 'tooltip_indicator-item-value',
}

export default class TooltipIndicator extends BaseComponent<TooltipIndicatorConfig> {
  private curX = 0;
  private curY = 0;
  private offsetX = 0;
  private scrollWidth = 0;
  private bodyGroup: IGroup;
  private gm: GM;
  private wheel: Wheel;
  private selectedItems: string[] = [];

  public destroy() {
    this.offEvents();
    super.destroy();
  }

  protected init(config: TooltipIndicatorConfig): void {
    this.config = deepMix(
      {},
      {
        items: [],
        x: 0,
        y: 0,
        title: {
          spacing: 4,
          style: {
            fontSize: 12,
            fill: '#000',
          },
        },
        line: {
          spacing: 8,
          width: 2,
          style: {},
        },
        itemName: {
          wrapLine: true,
          spacingX: 0,
          spacingY: 4,
          style: {
            fill: '#ccc',
            fontSize: 12,
          },
        },
        itemValue: {
          style: {
            fill: '#000',
            fontWeight: 'bold',
            fontSize: 14,
          },
        },
        itemBackground: {
          style: {
            fill: '#000',
            fillOpacity: 0,
          },
        },
        itemSpacing: 24,
      },
      config
    );
    this.selectedItems = this.config.selectedItems || [];
  }
  protected renderInner(group: IGroup): void {
    const itemGroups: IGroup[] = [];
    this.renderTitle(group);
    this.bodyGroup = group.addGroup({
      name: ELEMENT_NAMES.TOOLTIP_INDICATOR_BODY,
    });
    each(this.config.items, (item: IndicatorItem) => {
      itemGroups.push(this.renderItem(this.bodyGroup, item));
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
      this.curY += title.spacing || 0;
      return shape;
    }
  }

  private renderItem(group: IGroup, item: IndicatorItem): IGroup {
    const { itemBackground } = this.config;
    const itemGroup = group.addGroup({
      name: ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_GROUP,
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
    const nameShape = this.renderItemName(itemGroup, item);
    const valueShape = this.renderItemValue(itemGroup, item);
    const itemGroupBBox = itemGroup.getBBox();
    // update line height
    line.attr({
      y2: line.attr('y1') + itemGroupBBox.height - line.attr('lineWidth'),
    });

    // spacing
    if (this.config.itemName.wrapLine) {
      this.curX += Math.max(nameShape.getBBox().width, valueShape.getBBox().width);
    }
    this.curX += this.config.itemSpacing || 0;

    // update background
    background.attr({
      width: this.curX - oldX,
      height: this.curY - oldY,
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
    this.curX += line.spacing || 0;

    return shape;
  }

  private renderItemName(group: IGroup, item: IndicatorItem): IShape {
    const { itemName } = this.config;
    const shape = group.addShape({
      name: ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_NAME,
      type: 'text',
      attrs: {
        x: this.curX,
        y: this.curY,
        textAlign: 'left',
        textBaseline: 'top',
        text: item.name,
        ...(itemName.style || {}),
      },
    });
    const bbox = shape.getBBox();
    if (itemName.wrapLine) {
      this.curY += bbox.height;
      this.curY += itemName.spacingY || 0;
    } else {
      this.curX += bbox.width;
      this.curX += itemName.spacingX || 0;
    }

    return shape;
  }

  private renderItemValue(group: IGroup, item: IndicatorItem): IShape {
    const { itemValue } = this.config;
    const shape = group.addShape({
      name: ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_VALUE,
      type: 'text',
      attrs: {
        x: this.curX,
        y: this.curY,
        textAlign: 'left',
        textBaseline: 'top',
        text: item.value,
        ...(itemValue.style || {}),
      },
    });
    const bbox = shape.getBBox();

    this.curY += bbox.height;

    return shape;
  }

  private layoutItems(group: IGroup): void {
    const { x, width } = this.config;
    const bodyGroup = group.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_BODY)[0];
    const itemGroups = group.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_ITEM_GROUP);
    if (!bodyGroup || itemGroups.length === 0) {
      return;
    }
    const bodyGroupBBox = bodyGroup.getBBox();
    this.scrollWidth = bodyGroupBBox.width;
    if (bodyGroupBBox.width < width) {
      const avgWidth = width / itemGroups.length;
      each(itemGroups, (itemGroup: IGroup, index: number) => {
        const bbox = itemGroup.getBBox();
        translate(itemGroup, x + avgWidth * index - bbox.x, 0);
      });
    }
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

  private bindEvents(group: IGroup) {
    this.offEvents();
    const bodyGroup = group.findAllByName(ELEMENT_NAMES.TOOLTIP_INDICATOR_BODY)[0];
    bodyGroup.on('mousemove', this.onBodyGroupMousemove);
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

  private onBodyGroupMousemove = () => {
    // TODO:
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
