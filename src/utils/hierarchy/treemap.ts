import * as d3Hierarchy from 'd3-hierarchy';
import { assign, isArray } from '@antv/util';
import { HierarchyOption } from './types';
import { getField, getAllNodes } from './util';

const DEFAULT_OPTIONS: HierarchyOption = {
  field: 'value',
  tile: 'treemapSquarify', // treemapBinary, treemapDice, treemapSlice, treemapSliceDice, treemapSquarify, treemapResquarify
  size: [1, 1], // width, height
  round: false,
  padding: 0,
  paddingInner: 0,
  paddingOuter: 0,
  paddingTop: 0,
  paddingRight: 0,
  paddingBottom: 0,
  paddingLeft: 0,
  as: ['x', 'y'],
};

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

  const partition = (data) =>
    d3Hierarchy
      .treemap()
      .tile(d3Hierarchy[options.tile])
      .size(options.size)
      .round(options.round)
      .padding(options.padding)
      .paddingInner(options.paddingInner)
      .paddingOuter(options.paddingOuter)
      .paddingTop(options.paddingTop)
      .paddingRight(options.paddingRight)
      .paddingBottom(options.paddingBottom)
      .paddingLeft(options.paddingLeft)(d3Hierarchy.hierarchy(data).sum((d) => d[field]));
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
