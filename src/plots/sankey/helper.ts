import { Data } from '../../types';
import { isRealNumber, pick } from '../../utils';
import { transformDataToNodeLinkData } from '../../utils/data';
import { cutoffCircle } from './circle';
import { sankeyLayout, SankeyLayoutInputData } from './layout';
import { SankeyOptions } from './types';

/**
 * 是否是 node-link 类型的数据结构
 * @param dataTyp
 * @returns
 */
function isNodeLink(dataType: string) {
  return dataType === 'node-link';
}

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
    dataType,
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

  let sankeyLayoutInputData: unknown;

  if (!isNodeLink(dataType)) {
    sankeyLayoutInputData = transformDataToNodeLinkData(
      cutoffCircle(data as Data, sourceField, targetField),
      sourceField,
      targetField,
      weightField,
      rawFields
    );
  } else {
    sankeyLayoutInputData = data;
  }

  // 3. layout 之后的数据
  const { nodes, links } = sankeyLayout(
    {
      nodeAlign,
      nodePadding: getNodePaddingRatio(nodePadding, nodePaddingRatio, height),
      nodeWidth: getNodeWidthRatio(nodeWidth, nodeWidthRatio, width),
      nodeSort,
      nodeDepth,
    },
    sankeyLayoutInputData as SankeyLayoutInputData
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
