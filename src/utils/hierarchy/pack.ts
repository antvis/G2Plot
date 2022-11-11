import { assign, isArray } from '@antv/util';
import * as d3Hierarchy from 'd3-hierarchy';
import { HierarchyOption } from './types';
import { getAllNodes, getField } from './util';

type Options = Omit<HierarchyOption, 'as'> & { as?: [string, string, string] };

const DEFAULT_OPTIONS: Options = {
  field: 'value',
  as: ['x', 'y', 'r'],
  // 默认降序
  sort: (a, b) => b.value - a.value,
};

export function pack(data: any, options: Options): any[] {
  options = assign({} as Options, DEFAULT_OPTIONS, options);
  const as = options.as;
  if (!isArray(as) || as.length !== 3) {
    throw new TypeError('Invalid as: it must be an array with 3 strings (e.g. [ "x", "y", "r" ])!');
  }

  let field;
  try {
    field = getField(options);
  } catch (e) {
    console.warn(e);
  }

  const packLayout = (data) =>
    d3Hierarchy.pack().size(options.size).padding(options.padding)(
      d3Hierarchy
        .hierarchy(data)
        .sum((d) => d[field])
        .sort(options.sort)
    );

  const root = packLayout(data);

  const x = as[0];
  const y = as[1];
  const r = as[2];
  root.each((node) => {
    node[x] = node.x;
    node[y] = node.y;
    node[r] = node.r;
  });

  return getAllNodes(root);
}
