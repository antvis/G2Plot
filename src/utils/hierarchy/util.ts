import { filter, isArray, isString } from '@antv/util';

/** export 一些字段常量 */
/** 在同层级，同一父节点下的节点索引顺序 */
export const NODE_INDEX_FIELD = 'nodeIndex';
/** child 节点数量 */
export const CHILD_NODE_COUNT = 'childNodeCount';
/** 节点的祖先节点 */
export const NODE_ANCESTORS_FIELD = 'nodeAncestor';

const INVALID_FIELD_ERR_MSG = 'Invalid field: it must be a string!';

interface Options {
  field?: string | string[];
  fields?: string | string[];
}

export function getField(options: Options, defaultField?: string): string {
  const { field, fields } = options;
  if (isString(field)) {
    return field;
  }
  if (isArray(field)) {
    console.warn(INVALID_FIELD_ERR_MSG);
    return field[0];
  }
  console.warn(`${INVALID_FIELD_ERR_MSG} will try to get fields instead.`);
  if (isString(fields)) {
    return fields;
  }
  if (isArray(fields) && fields.length) {
    return fields[0];
  }
  if (defaultField) {
    return defaultField;
  }
  throw new TypeError(INVALID_FIELD_ERR_MSG);
}

export function getAllNodes(root: any) {
  const nodes: any[] = [];
  if (root && root.each) {
    let parent;
    let index;
    // d3-hierarchy: Invokes the specified function for node and each descendant in **breadth-first order**
    root.each((node: any) => {
      if (node.parent !== parent) {
        parent = node.parent;
        index = 0;
      } else {
        index += 1;
      }
      const ancestors = filter(
        (node.ancestors?.() || []).map((d: any) => nodes.find((n) => n.name === d.name) || d),
        ({ depth }) => depth > 0 && depth < node.depth
      );

      node[NODE_ANCESTORS_FIELD] = ancestors;
      node[CHILD_NODE_COUNT] = node.children?.length || 0;
      node[NODE_INDEX_FIELD] = index;

      nodes.push(node);
    });
  } else if (root && root.eachNode) {
    // @antv/hierarchy
    root.eachNode((node: any) => {
      nodes.push(node);
    });
  }
  return nodes;
}
