import { assign, isArray } from '@antv/util';
import * as d3Hierarchy from 'd3-hierarchy';
import { HierarchyOption } from './types';
import { getAllNodes, getField } from './util';

const DEFAULT_OPTIONS: HierarchyOption = {
  field: 'value',
  tile: 'treemapSquarify', // treemapBinary, treemapDice, treemapSlice, treemapSliceDice, treemapSquarify, treemapResquarify
  size: [1, 1], // width, height
  round: false,
  ignoreParentValue: true,
  padding: 0,
  paddingInner: 0,
  paddingOuter: 0,
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  as: ['x', 'y'],
  // 默认降序
  sort: (a, b) => b.value - a.value,
  // 纵横比, treemapSquarify 布局时可用，默认黄金分割比例
  ratio: 0.5 * (1 + Math.sqrt(5)),
};

export function getTileMethod(tile: string, ratio: number) {
  return tile === 'treemapSquarify' ? d3Hierarchy[tile].ratio(ratio) : d3Hierarchy[tile];
}

export function treemap(data: any, options: HierarchyOption): any[] {
  options = assign({} as HierarchyOption, DEFAULT_OPTIONS, options);
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

  const tileMethod = getTileMethod(options.tile, options.ratio);

  const partition = (data) =>
    d3Hierarchy
      .treemap()
      .tile(tileMethod)
      .size(options.size)
      .round(options.round)
      .padding(options.padding)
      .paddingInner(options.paddingInner)
      .paddingOuter(options.paddingOuter)
      .paddingTop(options.paddingTop)
      .paddingRight(options.paddingRight)
      .paddingBottom(options.paddingBottom)
      .paddingLeft(options.paddingLeft)(
      /**
       * d3Hierarchy 布局中需指定 sum 函数计算 node 值，规则是：从当前 node 开始以 post-order traversal 的次序为当前节点以及每个后代节点调用指定的 value 函数，并返回当前 node。
       * for example:
       * { node: 'parent', value: 10, children: [{node: 'child1', value: 5}, {node: 'child2', value: 5}, ]}
       * parent 所得的计算值是 sum(node(parent)) + sum(node(child1)) + sum(node(child2))
       * ignoreParentValue 为 true(默认) 时，父元素的值由子元素累加而来，该值为 0 + 5 + 5 = 10
       * ignoreParentValue 为 false 时，父元素的值由当前节点 及子元素累加而来，该值为 10 + 5 + 5 = 20
       * sum 函数中，d 为用户传入的 data, children 为保留字段
       */
      d3Hierarchy
        .hierarchy(data)
        .sum((d) => (options.ignoreParentValue && d.children ? 0 : d[field]))
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
