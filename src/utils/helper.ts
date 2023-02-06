export function lowerFirst(str) {
  return str.charAt(0).toLowerCase() + str.substring(1);
}

export function compact(arr) {
  return arr.filter((d) => !!d && !Number.isNaN(d));
}

export function pick<V extends object>(v: V, fields: string[] = []): V {
  return fields.reduce((datum, field) => {
    // Pick the data deeply.
    if (field in v) {
      datum[field] = v[field];
    }
    return datum;
  }, {} as V);
}

export function omit(obj, keys) {
  return Object.entries(obj).reduce((r, [k, v]) => {
    if (!keys.includes(k)) r[k] = v;
    return r;
  }, {});
}

export function assignDeep(target, ...sources) {
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
}

export function subObject(obj, prefix) {
  if (typeof obj !== 'object' || obj === null) return obj;
  return Object.fromEntries(
    Object.entries(obj)
      .filter(([key]) => key.startsWith(prefix))
      .map(([key, value]) => [lowerFirst(key.replace(prefix, '')), value])
      .filter(([key]) => !!key),
  );
}

export function omitObject(obj, prefixs) {
  if (typeof obj !== 'object' || obj === null) return obj;
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !!key && !new RegExp(`^[${prefixs.join('|')}]`).test(key)),
  );
}
