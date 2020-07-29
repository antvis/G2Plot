/**
 * 模板分割符, 默认 { }
 * @param string
 * @param options
 */
export function template(source: string, data: object): string {
  let result = '';
  let index = 0;
  source.replace(/{([\s\S]+?)}/g, (match: string, escapeValue: string, offset: number) => {
    result += source.slice(index, offset);
    result += data[escapeValue] || match;
    index = offset + match.length;

    return source;
  });

  return result + source.slice(index);
}
