import { isArray, isString } from '@antv/util';

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
    // d3-hierarchy
    root.each((node: any) => {
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
