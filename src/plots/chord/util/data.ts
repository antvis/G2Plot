import { Data, Datum } from '../../../types';
import { ChordLayoutInputData } from '../../../utils/transform/chord';

/**
 * 将数据序列转换成 chord layout 需要的数据结构
 * @param data
 * @param sourceField
 * @param targetField
 * @param sourceWeightField
 * @param targetWeightField
 */
export function transformDataToChord(
  data: Data,
  sourceField: string,
  targetField: string,
  sourceWeightField: string,
  targetWeightField: string
): ChordLayoutInputData {
  if (!Array.isArray(data)) {
    return {
      nodes: [],
      links: [],
    };
  }

  //   const nodes = [];
  const links = [];
  // 先使用对象方式存储
  const nodesMap = {};
  let nodesIndex = -1;
  // 数组变换成 chord layout 的数据结构
  data.forEach((datum: Datum) => {
    const source = datum[sourceField];
    const target = datum[targetField];
    const sourceWeight = datum[sourceWeightField];
    const targetWeight = datum[targetWeightField];

    // source node
    if (!nodesMap[source]) {
      nodesMap[source] = {
        id: ++nodesIndex,
        name: source,
      };
    }
    if (!nodesMap[target]) {
      nodesMap[target] = {
        id: ++nodesIndex,
        name: target,
      };
    }
    // links
    links.push({
      source: nodesMap[source].id,
      target: nodesMap[target].id,
      sourceName: source,
      targetName: target,
      sourceWeight,
      targetWeight,
    });
  });
  return {
    nodes: Object.values(nodesMap),
    links,
  };
}
