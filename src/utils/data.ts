import { filter, get, isNumber } from '@antv/util';
import { Data, Datum, Meta, Options } from '../types';
import { Node, NodeLinkData } from '../types/relation-data';
import { LEVEL, log } from './invariant';
import { pick } from './pick';

/**
 * 查看数据是否是全负数、或者全正数
 * @param data
 * @param field
 */
export function adjustYMetaByZero(data: Data, field: string): Meta {
  if (!data) return {};
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
 * @param rawFields 存放一些原数据
 */
export function transformDataToNodeLinkData(
  data: Data,
  sourceField: string,
  targetField: string,
  weightField: string,
  rawFields: string[] = []
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
  const nodesMap: Record<string, Node> = {};
  let nodesIndex = -1;
  // 数组变换成 chord layout 的数据结构
  data.forEach((datum: Datum) => {
    const source = datum[sourceField];
    const target = datum[targetField];
    const weight = datum[weightField];

    const rawData = pick(datum, rawFields);

    // source node
    if (!nodesMap[source]) {
      nodesMap[source] = {
        id: ++nodesIndex,
        name: source,
        ...rawData,
      };
    }
    if (!nodesMap[target]) {
      nodesMap[target] = {
        id: ++nodesIndex,
        name: target,
        ...rawData,
      };
    }
    // links
    links.push({
      source: nodesMap[source].id,
      target: nodesMap[target].id,
      // sourceName: source,
      // targetName: target,
      value: weight,
      ...rawData,
    });
  });
  return {
    // 需要按照 id 的顺序
    nodes: Object.values(nodesMap).sort((a, b) => a.id - b.id),
    links,
  };
}

/**
 * 处理不合法的数据(过滤 非数值型 和 NaN，保留 null)
 * @param data
 * @param angleField
 */
export function processIllegalData(data: Options['data'], field: string) {
  const processData = filter(data, (d) => {
    const v = d[field];
    return v === null || (typeof v === 'number' && !isNaN(v));
  });

  // 打印异常数据情况
  log(LEVEL.WARN, processData.length === data.length, 'illegal data existed in chart data.');

  return processData;
}
