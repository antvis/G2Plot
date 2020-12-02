import { Data, Datum } from '../../../types';
import { SankeyLayoutInputData } from '../../../utils/transform/sankey';

/**
 * 将数据序列转换成 sankey layout 需要的数据结构
 * 1. 过滤掉处理来源去向相同的节点
 * 2. 避免形成环
 * @param data
 * @param sourceField
 * @param targetField
 * @param weightField
 */
export function transformDataToSankey(
  data: Data,
  sourceField: string,
  targetField: string,
  weightField: string
): SankeyLayoutInputData {
  if (!Array.isArray(data)) {
    return {
      nodes: [],
      links: [],
    };
  }

  const nodes = [];
  const links = [];

  // TODO 逍为
  // 1. 使用 Map 进行一些性能优化（目前 includes，indexOf 会大量进行数组遍历）
  // 2. link 去重

  // 数组变换成 sankey layout 的数据结构
  data.forEach((datum: Datum) => {
    const source = datum[sourceField];
    const target = datum[targetField];
    const weight = datum[weightField];

    // source node
    if (!nodes.includes(source)) {
      nodes.push(source);
    }

    // target node
    if (!nodes.includes(target)) {
      nodes.push(target);
    }

    // links
    links.push({
      source: nodes.indexOf(source),
      target: nodes.indexOf(target),
      value: weight,
    });
  });

  return {
    nodes: nodes.map((name) => ({ name })),
    links,
  };
}
