import { each } from '@antv/util';
import { Data, Datum } from '../../types';

/**
 * 是否有环的判断依据是，当前 source 对应的 target 是 source 的父节点
 * @param circleCache
 * @param source
 * @param target
 */
function hasCircle(circleCache: Map<string, string>, source: string, target: string): boolean {
  let pid = source;

  do {
    if (pid === target) return true;
  } while ((pid = circleCache.get(pid))); // 如果到了根节点，那么就直接停止

  return false;
}

/**
 * 切断桑基图数据中的环（会丢失数据），保证顺序
 * @param data
 * @param sourceField
 * @param targetField
 */
export function cutoffCircle(data: Data, sourceField: string, targetField: string): Data {
  const dataWithoutCircle = [];
  const removedData = [];

  /** 存储父子关系的链表关系，具体是 子 -> 父 */
  const circleCache = new Map<string, string>();

  each(data, (d: Datum) => {
    const source = d[sourceField];
    const target = d[targetField];

    // 当前数据，不成环
    if (!hasCircle(circleCache, source, target)) {
      // 保留数据
      dataWithoutCircle.push(d);
      // 存储关系链表
      circleCache.set(target, source);
    } else {
      // 保存起来用于打印 log
      removedData.push(d);
    }
  });

  if (removedData.length !== 0) {
    console.warn(`sankey data contains circle, ${removedData.length} records removed.`, removedData);
  }

  return dataWithoutCircle;
}
