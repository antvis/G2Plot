/**
 * 模板分割符, 默认 { }
 * @param string
 * @param options
 */
export function template(source: string, data: object): string {
  // `(?<=y)x` 匹配'x'仅当'x'前面是'y'.这种叫做后行断言; `x(?=y)` 匹配'x'仅仅当'x'后面跟着'y'.这种叫做先行断言。
  return source.replace(/{((?<={)[^{}]+(?=}))}/g, (match, key) => data[key.trim()] || match);
}
