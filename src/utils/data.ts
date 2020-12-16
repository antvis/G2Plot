import { get, isNumber } from '@antv/util';
import { Data, Datum, Meta } from '../types';
import { NodeLinkData } from '../types/relation-data';

/**
 * 查看数据是否是全负数、或者全正数
 * @param data
 * @param field
 */
export function adjustYMetaByZero(data: Data, field: string): Meta {
  // 过滤出数字数据
  const numberData = data.filter((datum: Datum) => {
    const v = get(datum, [field]);
    return isNumber(v) && !isNaN(v);
  });

  const gtZero = numberData.every((datum: Datum) => get(datum, [field]) >= 0);
  const ltZero = numberData.every((datum: Datum) => get(datum, [field]) <= 0);

  // 目前是增量更新，对 { min: 0, max: undefined } 进行 update({ max: 0 }) 会得到 { min: 0, max: 0 }
  if (gtZero) {
    return { min: 0 };
  }
  if (ltZero) {
    return { max: 0 };
  }
  return {};
}
/**
 * 转换数据格式为带有节点与边的数据格式
 * @param data
 * @param sourceField
 * @param targetField
 * @param weightField
 */
export function transformDataToNodeLinkData(
  data: Data,
  sourceField: string,
  targetField: string,
  weightField: string
): NodeLinkData {
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
    const weight = datum[weightField];

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
      // sourceName: source,
      // targetName: target,
      value: weight,
    });
  });
  return {
    nodes: Object.values(nodesMap),
    links,
  };
}
