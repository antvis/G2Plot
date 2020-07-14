/**
 * 类似 lodash.pick 的方法
 * @param obj
 * @param keys
 */
export function pick(obj: any, keys: string[]): object {
  const r = {};

  if (obj !== null && typeof obj === 'object') {
    keys.forEach((key: string) => {
      const v = obj[key];
      if (v !== undefined) {
        r[key] = v;
      }
    });
  }
  return r;
}
