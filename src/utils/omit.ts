/**
 * 类似 lodash.omit 的方法
 * @param obj
 * @param keys
 */
export function omit(obj: any, keys: string[]): object {
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
  return {};
}
