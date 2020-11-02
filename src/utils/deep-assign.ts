const MAX_MIX_LEVEL = 5; // 最大比对层级

const toString = {}.toString;

// 类型检测
const isType = (value: any, type: string): boolean => toString.call(value) === '[object ' + type + ']';

const isArray = (value: any): value is Array<any> => {
  return Array.isArray ? Array.isArray(value) : isType(value, 'Array');
};

const isObjectLike = (value: any): value is object => {
  /**
   * isObjectLike({}) => true
   * isObjectLike([1, 2, 3]) => true
   * isObjectLike(Function) => false
   * isObjectLike(null) => false
   */
  return typeof value === 'object' && value !== null;
};

const isPlainObject = (value: any): value is object => {
  /**
   * isObjectLike(new Foo) => false
   * isObjectLike([1, 2, 3]) => false
   * isObjectLike({ x: 0, y: 0 }) => true
   * isObjectLike(Object.create(null)) => true
   */
  if (!isObjectLike(value) || !isType(value, 'Object')) {
    return false;
  }
  if (Object.getPrototypeOf(value) === null) {
    return true;
  }
  let proto = value;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(value) === proto;
};

/***
 * @param {any} dist
 * @param {any} src
 * @param {number} level 当前层级
 * @param {number} maxLevel 最大层级
 */
const deep = (dist, src, level?, maxLevel?) => {
  level = level || 0;
  maxLevel = maxLevel || MAX_MIX_LEVEL;
  for (const key in src) {
    if (Object.prototype.hasOwnProperty.call(src, key)) {
      const value = src[key];
      if (!value) {
        // null 、 undefined 等情况直接赋值
        dist[key] = value;
      } else {
        if (isPlainObject(value)) {
          if (!isPlainObject(dist[key])) {
            dist[key] = {};
          }
          if (level < maxLevel) {
            deep(dist[key], value, level + 1, maxLevel);
          } else {
            // 层级过深直接赋值，性能问题
            dist[key] = src[key];
          }
        } else if (isArray(value)) {
          dist[key] = [];
          dist[key] = dist[key].concat(value);
        } else {
          dist[key] = value;
        }
      }
    }
  }
};

/**
 * deepAssign 功能类似 deepMix
 * 不同点在于 deepAssign 会将 null undefined 等类型直接覆盖给 source
 * 详细参考： __tests__/unit/utils/deep-assign-spec.ts
 */
export const deepAssign = (rst: any, ...args: any[]) => {
  for (let i = 0; i < args.length; i += 1) {
    deep(rst, args[i]);
  }
  return rst;
};
