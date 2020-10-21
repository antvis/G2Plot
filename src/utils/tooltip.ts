import { isType } from '@antv/util';

/**
 * tooltip formatter
 * @param {any} tooltipOptions
 * @param {boolean} isPercent
 */
export function transformTooltip(tooltipOptions: any, isPercent?: boolean) {
  // customContent 优先级高于 formatter
  if (!isType(tooltipOptions, 'Object') || tooltipOptions?.customContent) {
    return tooltipOptions;
  }
  const tooltip = { ...tooltipOptions };
  if (tooltip.formatter || isPercent) {
    tooltip.customContent = (value: string, items: any[]) => {
      return getTooltipTemplate({
        value,
        items,
        formatter: tooltip.formatter,
        isPercent,
      });
    };
  }
  return tooltip;
}

/**
 * formatter value
 * @param {string} value
 * @param {any[]} items
 * @param {Function} formatter
 * @param {boolean} isPercent
 * @returns HTMLElement
 */
export function getTooltipTemplate(params: {
  value: string;
  items: any[];
  formatter?: (item: any) => string;
  isPercent?: boolean;
}): HTMLElement {
  const { value, items, formatter, isPercent } = params;
  const container = document.createElement('div');
  container.className = 'g2-tooltip';
  const title = `<div class="g2-tooltip-title" style="margin-top: 12px;margin-bottom: 12px;">${value}</div>`;
  let listItem = '';
  const formatterItem = (item) => {
    if (formatter) {
      return formatter(item);
    }
    if (isPercent) {
      return (item?.value * 100).toFixed(2) + '%';
    }
    return item?.value;
  };
  items.forEach((item) => {
    listItem += `<li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:4px;display:flex;align-items: center;">
        <span style="background-color:${item.mappingData?.color || item.color};" class="g2-tooltip-marker"></span>
        <span style="display:inline-flex;flex:1;justify-content:space-between">
        <span style="margin-right: 16px;">${item.name}:</span><span>${formatterItem(item)}</span>
        </span>
    </li>`;
  });
  container.innerHTML = title + listItem;
  return container;
}
