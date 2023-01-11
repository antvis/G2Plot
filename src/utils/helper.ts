export const lowerFirst = (str) =>
  str.charAt(0).toLowerCase() + str.substring(1);

export const compact = (arr) => arr.filter((d) => !!d && !Number.isNaN(d));

export const omit = (obj, keys) =>
  Object.entries(obj).reduce((r, [k, v]) => {
    if (!keys.includes(k)) r[k] = v;
    return r;
  }, {});

export const assignDeep = (target, ...sources) => {
  if (target == null) {
    throw new TypeError('Cannot convert undefiend or null to object');
  }

  let result = Object(target);
  sources.forEach((source) => {
    if (source === null || source === undefined) return;
    if (typeof source === 'boolean') result = source;

    function assign(key, value) {
      if (typeof value === 'object' && !(value == null)) {
        if (result[key] == null) {
          result[key] = assignDeep(Array.isArray(value) ? [] : {}, value);
        } else if (Array.isArray(result[key])) {
          result[key] = result[key].concat(value);
        } else {
          assignDeep(result[key], value);
        }
      } else {
        result[key] = value;
      }
    }

    Object.entries(source).forEach(([key, value]) => assign(key, value));
    Object.getOwnPropertySymbols(source).forEach((key) => {
      if (Object.getOwnPropertyDescriptor(source, key)?.enumerable) {
        assign(key, source[key]);
      }
    });
  });

  return result;
};

export const subObject = (obj, prefix) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([key]) => key.startsWith(prefix))
      .map(([key, value]) => [lowerFirst(key.replace(prefix, '')), value])
      .filter(([key]) => !!key),
  );
};

export const omitObject = (obj, prefixs) => {
  if (typeof obj !== 'object' || obj === null) return obj;
  return Object.fromEntries(
    Object.entries(obj).filter(
      ([key]) => !!key && !new RegExp(`^[${prefixs.join('|')}]`).test(key),
    ),
  );
};
