import * as d3Hierarchy from 'd3-hierarchy';
import { assign, isArray, reduce } from '@antv/util';
import { getField, getAllNodes } from './util';

const DEFAULT_OPTIONS: Options = {
  field: 'value',
  size: [1, 1], // width, height
  round: false,
  padding: 0,
  // 默认降序
  sort: (a, b) => b.value - a.value,
  as: ['x', 'y'],
};

export interface Options {
  field: string;
  size?: [number, number];
  round?: boolean;
  ratio?: number;
  padding?: number;
  sort?: Function;
  as?: [string, string];
}

export function partition(data: any, options: Options): any[] {
  options = assign({} as Options, DEFAULT_OPTIONS, options);
  const as = options.as;
  if (!isArray(as) || as.length !== 2) {
    throw new TypeError('Invalid as: it must be an array with 2 strings (e.g. [ "x", "y" ])!');
  }

  let field;
  try {
    field = getField(options);
  } catch (e) {
    console.warn(e);
  }

  const partition = (data) =>
    d3Hierarchy.partition().size(options.size).round(options.round).padding(options.padding)(
      /**
       * d3Hierarchy 布局中需指定 sum 函数计算 node 值，规则是：从当前 node 开始以 post-order traversal 的次序为当前节点以及每个后代节点调用指定的 value 函数，并返回当前 node。
       * for example:
       * { node: 'parent', value: 10, children: [{node: 'child1', value: 5}, {node: 'child2', value: 5}, ]}
       * parent 所得的计算值是 sum(node(parent)) + sum(node(child1)) + sum(node(child2))
       * sum 函数中，d 为用户传入的 data, children 为保留字段
       */
      d3Hierarchy
        .hierarchy(data)
        .sum((d) => (d.children ? d[field] - reduce(d.children, (a, b) => a + b[field], 0) : d[field]))
        .sort(options.sort)
    );
  const root = partition(data);

  /*
   * points:
   *   3  2
   *   0  1
   */
  const x = as[0];
  const y = as[1];

  root.each((node) => {
    node[x] = [node.x0, node.x1, node.x1, node.x0];
    node[y] = [node.y1, node.y1, node.y0, node.y0];
    ['x0', 'x1', 'y0', 'y1'].forEach((prop) => {
      if (as.indexOf(prop) === -1) {
        delete node[prop];
      }
    });
  });

  return getAllNodes(root);
}
