import { isRealNumber, pick } from '../../utils';
import { transformDataToNodeLinkData } from '../../utils/data';
import { sankeyLayout } from './layout';
import { cutoffCircle } from './circle';
import { SankeyOptions } from './types';

export function getNodeWidthRatio(nodeWidth: number, nodeWidthRatio: number, width: number) {
  return isRealNumber(nodeWidth) ? nodeWidth / width : nodeWidthRatio;
}

export function getNodePaddingRatio(nodePadding: number, nodePaddingRatio: number, height: number) {
  return isRealNumber(nodePadding) ? nodePadding / height : nodePaddingRatio;
}

/**
 * 将桑基图配置经过 layout，生成最终的 view 数据
 * @param options
 * @param width
 * @param height
 */
export function transformToViewsData(options: SankeyOptions, width: number, height: number) {
  const {
    data,
    sourceField,
    targetField,
    weightField,
    nodeAlign,
    nodeSort,
    nodePadding,
    nodePaddingRatio,
    nodeWidth,
    nodeWidthRatio,
    nodeDepth,
    rawFields = [],
  } = options;

  const sankeyLayoutInputData = transformDataToNodeLinkData(
    cutoffCircle(data, sourceField, targetField),
    sourceField,
    targetField,
    weightField,
    rawFields
  );

  // 3. layout 之后的数据
  const { nodes, links } = sankeyLayout(
    {
      nodeAlign,
      nodePadding: getNodePaddingRatio(nodePadding, nodePaddingRatio, height),
      nodeWidth: getNodeWidthRatio(nodeWidth, nodeWidthRatio, width),
      nodeSort,
      nodeDepth,
    },
    sankeyLayoutInputData
  );

  // 4. 生成绘图数据
  return {
    nodes: nodes.map((node) => {
      return {
        ...pick(node, ['x', 'y', 'name', ...rawFields]),
        isNode: true,
      };
    }),
    edges: links.map((link) => {
      return {
        source: link.source.name,
        target: link.target.name,
        name: link.source.name || link.target.name,
        ...pick(link, ['x', 'y', 'value', ...rawFields]),
        isNode: false,
      };
    }),
  };
}
