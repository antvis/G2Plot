import { Types } from '@antv/g2';
import { isArray } from '@antv/util';
import { normalPadding } from '../../utils/padding';
import { Interaction } from '../../types/interaction';
import { partition } from '../../utils/hierarchy/partition';
import { treemap } from '../../utils/hierarchy/treemap';
import { SunburstOptions, SunburstData } from './types';

export const COLORROOTKEY = 'COLORROOTKEY';

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
      [seriesField]: node.data[seriesField] || node.parent?.data?.[seriesField],
      [colorField]: node.data[colorField] || node.parent?.data?.[colorField],
      ...node,
    };
    nodeInfo.ext = hierarchyConfig;
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
  formatter?: (item: any) => { name: string; value: string | number };
  fields?: string[];
}): HTMLElement {
  const { items, formatter, fields } = params;
  const { color, mappingData, data } = items[0] || {}; // 不会有分组情况
  const container = document.createElement('ul');
  container.className = 'g2-tooltip';
  let listItem = '';
  const formatterItem = (item, field) => {
    if (formatter) {
      return formatter({ ...item, field });
    }
    return { name: field, value: item?.[field] || item?.data?.[field] };
  };

  fields.forEach((field) => {
    const { name, value } = formatterItem(data, field);
    listItem += `<li class="g2-tooltip-list-item" data-index={index} style="margin-bottom:4px;display:flex;align-items: center;">
        <span style="background-color:${mappingData?.color || color};" class="g2-tooltip-marker"></span>
        <span style="display:inline-flex;flex:1;justify-content:space-between">
        <span style="margin-right: 16px;">${name}:</span>
        <span class="g2-tooltip-list-item-value">${value}</span>
        </span>
    </li>`;
  });
  container.innerHTML = listItem;
  return container;
}

export function getAdjustAppendPadding(padding: Types.ViewAppendPadding) {
  const currentAppendPadding = normalPadding(padding);
  const TOP = 25;
  return [currentAppendPadding[0] + TOP, currentAppendPadding[1], currentAppendPadding[2], currentAppendPadding[3]];
}

export function findInteraction(
  interactions: SunburstOptions['interactions'],
  interactionType: string
): undefined | Interaction {
  if (!isArray(interactions)) return undefined;
  return interactions.find((i) => i.type === interactionType);
}

export function enableInteraction(interactions: SunburstOptions['interactions'], interactionType: string): boolean {
  const interaction = findInteraction(interactions, interactionType);
  return interaction && interaction.enable !== false;
}

// 数组的第一项name 添加到所有的子项 为brand 颜色区分字段 保证交互后依然可以有颜色区分
export function dataCreateBrand(datas: SunburstData[], nameKey: string, colorKey: string) {
  datas.forEach((data) => {
    const createBrand = (data: SunburstData, brand?: string) => {
      data[colorKey] = brand || data[nameKey];
      if (data.children) {
        data.children.forEach((item) => {
          createBrand(item, data[colorKey]);
        });
      }
    };
    createBrand(data);
  });
}
