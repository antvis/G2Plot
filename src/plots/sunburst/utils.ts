import { SunburstOptions } from './types';
import { partition } from './hierarchy/partition';
import { treemap } from './hierarchy/treemap';

/**
 * sunburst 处理数据
 * @param options
 */
export function transformData(options: SunburstOptions) {
  const { data, type, seriesField, colorField, hierarchyConfig } = options;
  const transform = {
    partition: partition,
    treemap: treemap,
  };
  const nodes = transform[type](data, {
    ...hierarchyConfig,
    // @ts-ignore
    type: `hierarchy.${type}`,
    field: seriesField,
    as: ['x', 'y'],
  });

  const result = [];
  nodes.forEach((node) => {
    if (node.depth === 0) {
      return null;
    }
    const nodeInfo = {
      [seriesField]: node.data?.[seriesField],
      [colorField]: node.data?.[colorField],
      ...node,
    };
    nodeInfo.ext = hierarchyConfig;
    if (!node.data.brand && node.parent) {
      nodeInfo.brand = node.parent.data.brand;
    } else {
      nodeInfo.brand = node.data.brand;
    }

    result.push(nodeInfo);
  });

  return result;
}

/**
 * customContent
 * @param {string} value
 * @param {any[]} items
 * @param {Function} formatter
 * @param {string} field
 * @returns HTMLElement
 */
export function getTooltipTemplate(params: {
  value: string;
  items: any[];
  formatter?: (item: any) => string;
  field?: string;
}): HTMLElement {
  const { items, formatter, field } = params;
  const container = document.createElement('div');
  container.className = 'g2-tooltip';
  let listItem = '';
  const formatterItem = (item) => {
    if (formatter) {
      return formatter(item);
    }
    return item?.[field];
  };
  items.forEach(({ name, color, mappingData, data: parentData }) => {
    const { data } = parentData;
    // 默认读取 name 和 label，其它情况使用外层 name
    listItem += `<li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:4px;display:flex;align-items: center;">
        <span style="background-color:${mappingData?.color || color};" class="g2-tooltip-marker"></span>
        <span style="display:inline-flex;flex:1;justify-content:space-between">
        <span style="margin-right: 16px;">${data?.name || data?.label || name}:</span>
        <span class="g2-tooltip-list-item-value">${formatterItem(parentData)}</span>
        </span>
    </li>`;
  });
  container.innerHTML = listItem;
  return container;
}
