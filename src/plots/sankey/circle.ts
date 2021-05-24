import { isArray } from '@antv/util';
import { Data } from '../../types';

/**
 * 根据 edges 获取对应的 node 结构
 */
export function getNodes(edges: Data, sourceField: string, targetField: string): string[] {
  const nodes = [];
  edges.forEach((e) => {
    const source = e[sourceField] as string;
    const target = e[targetField] as string;
    if (!nodes.includes(source)) {
      nodes.push(source);
    }
    if (!nodes.includes(target)) {
      nodes.push(target);
    }
  });
  return nodes;
}

/**
 * 根据 edges 获取对应的 dfs 邻接矩阵
 */
export function getMatrix(
  edges: Data,
  nodes: string[],
  sourceField: string,
  targetField: string
): Record<string, Record<string, number>> {
  const graphMatrix = {};

  nodes.forEach((pre) => {
    graphMatrix[pre] = {};
    nodes.forEach((next) => {
      graphMatrix[pre][next] = 0;
    });
  });

  edges.forEach((edge) => {
    graphMatrix[edge[sourceField]][edge[targetField]] = 1;
  });

  return graphMatrix;
}

/**
 * 使用 DFS 思路切断桑基图数据中的环（会丢失数据），保证顺序
 * @param data
 * @param sourceField
 * @param targetField
 */
export function cutoffCircle(edges: Data, sourceField: string, targetField: string): Data {
  if (!isArray(edges)) return [];

  // 待删除的环状结构
  const removedData = [];

  // 获取所有的节点
  const nodes = getNodes(edges, sourceField, targetField);
  // 获取节点与边的邻接矩阵
  const graphMatrix = getMatrix(edges, nodes, sourceField, targetField);

  // visited：标记节点访问状态, 0：未访问,1：访问中, -1：已访问
  const visited = {};
  // 初始化visited
  nodes.forEach((node) => {
    visited[node] = 0;
  });

  // 图的深度遍历函数
  function DFS(dfsNode) {
    // 节点状态置为正在访问
    visited[dfsNode] = 1;
    nodes.forEach((node) => {
      if (graphMatrix[dfsNode][node] != 0) {
        // 当前节点在访问中，再次被访问，证明有环，移动到 removeData
        if (visited[node] == 1) {
          // 拼接为字符串，方便最后过滤
          removedData.push(`${dfsNode}_${node}`);
        } else if (visited[node] == -1) {
          // 当前结点及后边的结点都被访问过，直接跳至下一个结点
          return;
        } else {
          DFS(node); // 否则递归访问
        }
      }
    });
    //遍历过所有相连的结点后，把本节点标记为-1
    visited[dfsNode] = -1;
  }

  // 对每个节点执行 dfs 操作
  nodes.forEach((node) => {
    //该结点后边的结点都被访问过了，跳过它
    if (visited[node] == -1) {
      return;
    }
    DFS(node);
  });

  if (removedData.length !== 0) {
    console.warn(`sankey data contains circle, ${removedData.length} records removed.`, removedData);
  }

  // 过滤 remove 路径
  return edges.filter((edge) => removedData.findIndex((i) => i === `${edge[sourceField]}_${edge[targetField]}`) < 0);
}
