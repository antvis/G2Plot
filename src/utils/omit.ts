/**
 * 类似 lodash.omit 的方法
 * @param obj
 * @param keys
 */
export function omit<O extends object>(obj: O, keys: string[]): O {
  if (obj !== null && typeof obj === 'object') {
    const r = obj;
    keys.forEach((key: string) => {
      const v = obj[key];
      if (v !== undefined) {
        delete obj[key];
      }
    });
    return r;
  }
  return {} as O;
}
