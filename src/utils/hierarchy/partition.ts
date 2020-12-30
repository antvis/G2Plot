import * as d3Hierarchy from 'd3-hierarchy';
import { assign, isArray } from '@antv/util';
import { getField, getAllNodes } from './util';

const DEFAULT_OPTIONS: Options = {
  field: 'value',
  size: [1, 1], // width, height
  round: false,
  padding: 0,
  sort: true,
  as: ['x', 'y'],
};

export interface Options {
  field: string;
  size?: [number, number];
  round?: boolean;
  ratio?: number;
  padding?: number;
  sort?: boolean;
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
      d3Hierarchy.hierarchy(data).sum((d) => d[field])
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
