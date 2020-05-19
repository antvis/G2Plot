import BaseComponent, { BaseComponentConfig } from './base';
import { IGroup, BBox, IShape } from '../dependents';
import { move } from '../util/g-util';
import { TextStyle, GraphicStyle } from '../interface/config';

export interface BreadcrumbItem {
  key: string;
  text: string;
}

export interface BreadcrumbConfig extends BaseComponentConfig {
  x: number;
  y: number;
  items: BreadcrumbItem[];
  itemPadding?: [number, number, number, number];
  backgroundStyle?: GraphicStyle;
  itemBackgroundStyle?: GraphicStyle;
  itemActiveBackgroundStyle?: GraphicStyle;
  separator?: string;
  separatorStyle?: TextStyle;
  itemWidth?: number;
  itemHeight?: number;
  maxItemWidth?: number;
  textStyle?: TextStyle;
}

export default class Breadcrumb extends BaseComponent<BreadcrumbConfig> {
  private x: number;
  private y: number;
  private items: BreadcrumbItem[];
  private itemPadding: [number, number, number, number];
  private backgroundStyle: {
    fill?: string;
    stroke?: string;
    lineWidth?: number;
  };
  private itemBackgroundStyle: {
    fill?: string;
    opacity?: number;
  };
  private itemActiveBackgroundStyle: {
    fill?: string;
    opacity?: number;
  };
  private separator: string;
  private separatorStyle: TextStyle;
  private itemWidth: number | undefined;
  private itemHeight: number | undefined;
  private maxItemWidth: number | undefined;
  private textStyle: TextStyle;

  private listeners: { target: IShape | IGroup; event: string; callback: () => void }[] = [];

  public destroy() {
    this.offEvents();
    super.destroy();
  }

  protected initConfig(config: BreadcrumbConfig) {
    this.x = config.x;
    this.y = config.y;
    this.items = config.items || [];
    this.itemPadding = config.itemPadding || [2, 8, 2, 8];
    this.backgroundStyle = { lineWidth: 1, stroke: '#ffffff', ...(config.backgroundStyle || {}) };
    this.itemBackgroundStyle = { fill: '#fff', ...(config.itemBackgroundStyle || {}) };
    this.itemActiveBackgroundStyle = { fill: '#ccc', opacity: 0.2, ...(config.itemActiveBackgroundStyle || {}) };
    this.separator = config.separator || '/';
    this.separatorStyle = { textBaseline: 'top', fill: '#000000', opacity: 0.45, ...(config.separatorStyle || {}) };
    this.itemWidth = config.itemWidth;
    this.itemHeight = config.itemHeight;
    this.maxItemWidth = config.maxItemWidth;
    this.textStyle = { textBaseline: 'top', fill: '#000000', opacity: 0.45, ...(config.textStyle || {}) };
  }

  protected renderInner(group: IGroup) {
    const startX = 0;
    const startY = 0;
    this.offEvents();
    this.renderItems(group, startX, startY);
    //this.bindEvents(group);
    move(this.group, this.x, this.y);
  }

  private renderItems(group: IGroup, startX: number, startY: number) {
    const [topPadding, rightPadding, bottomPadding, leftPadding] = this.itemPadding;
    let itemHeight;

    // background
    const backgroundRect = group.addShape('rect', {
      class: 'breadcrumb-background',
      attrs: {
        x: startX,
        y: startY,
        width: 1,
        height: 1,
        ...this.backgroundStyle,
      },
    });

    this.items.forEach((item: BreadcrumbItem, idx: number) => {
      // item group
      const itemGroup: IGroup = group.addGroup({
        id: `item-group-${item.key}`,
        // data: item.key,
        data: item,
        class: 'item-group',
        attrs: {
          cursor: 'pointer',
        },
      });

      // background rect

      const rectShape: any = itemGroup.addShape('rect', {
        id: `item-background-${item.key}`,
        class: 'item-background',
        attrs: {
          x: startX,
          y: startY,
          width: leftPadding + rightPadding,
          height: topPadding + bottomPadding,
          ...this.itemBackgroundStyle,
          cursor: 'pointer',
        },
      });
      rectShape.name = 'breadcrumb';

      // text shape
      const textShape: any = itemGroup.addShape('text', {
        id: `item-text-${item.key}`,
        class: 'item-text',
        attrs: {
          x: startX + leftPadding,
          y: startY + topPadding,
          text: item.text,
          ...this.textStyle,
          cursor: 'pointer',
        },
      });
      textShape.name = 'breadcrumb';
      const textShapeBBox: BBox = textShape.getBBox();
      itemHeight = this.itemHeight || textShapeBBox.height;
      let itemWidth = this.itemWidth || textShapeBBox.width;
      if (this.maxItemWidth) {
        itemWidth = Math.min(itemWidth, this.maxItemWidth);
      }
      // update background rect
      const backgroundRectAttr = {
        x: startX,
        y: startY,
        width: itemWidth + leftPadding + rightPadding,
        height: itemHeight + topPadding + bottomPadding,
      };
      rectShape.attr('width', backgroundRectAttr.width);
      rectShape.attr('height', backgroundRectAttr.height);
      // clip
      itemGroup.setClip({
        type: 'rect',
        attrs: backgroundRectAttr,
      });
      startX += backgroundRectAttr.width;

      // separator
      if (idx !== this.items.length - 1) {
        const sepShape: any = group.addShape('text', {
          attrs: {
            x: startX,
            y: startY + topPadding,
            text: this.separator,
            ...this.separatorStyle,
          },
          class: 'separator',
        });
        startX += sepShape.getBBox().width;
      }
    });

    // update background
    backgroundRect.attr({
      width: startX,
      height: itemHeight + topPadding + bottomPadding,
    });
  }

  private bindEvents(group: IGroup) {
    const items = this.items;
    const itemGroups = group.get('children').filter((item) => item.get('class') === 'item-group');
    const callback = (event: string, itemGroup: IGroup, emitEventName: string) => () => {
      const key: string = itemGroup.get('data');
      const item = items.find((val) => val.key === key);
      this.emit(emitEventName, {
        item,
      });
    };

    itemGroups.forEach((itemGroup) => {
      const clickCallback = callback('click', itemGroup, 'onItemClick');
      const dblclickCallback = callback('dblclick', itemGroup, 'onItemDblclick');
      const mouseEnterCallback = this.onItemGroupToggleActive(itemGroup, true);
      const mouseLeaveCallback = this.onItemGroupToggleActive(itemGroup, false);
      itemGroup.on('click', clickCallback);
      itemGroup.on('dblclick', dblclickCallback);
      itemGroup.on('mouseenter', mouseEnterCallback);
      itemGroup.on('mouseleave', mouseLeaveCallback);
      this.listeners.push({ target: itemGroup, event: 'click', callback: clickCallback });
      this.listeners.push({ target: itemGroup, event: 'dblclick', callback: dblclickCallback });
      this.listeners.push({ target: itemGroup, event: 'mouseenter', callback: mouseEnterCallback });
      this.listeners.push({ target: itemGroup, event: 'mouseleave', callback: mouseLeaveCallback });
    });
  }

  private onItemGroupToggleActive = (itemGroup: IGroup, active: boolean) => () => {
    const rectShape = itemGroup.get('children').find((item) => item.get('class') === 'item-background');
    if (rectShape) {
      rectShape.attr(active ? this.itemActiveBackgroundStyle : this.itemBackgroundStyle);
    }
    this.getCanvas().draw();
  };

  private offEvents() {
    if (this.listeners) {
      this.listeners.forEach(({ target, event, callback }) => {
        target.off(event, callback);
      });
    }
    this.listeners = [];
  }
}
