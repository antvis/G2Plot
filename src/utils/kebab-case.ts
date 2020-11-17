/**
 * @desc simple kebabCase like lodash
 *
 * kebabCase('fooBar'); => 'foo-bar'
 */
export function kebabCase(word: string) {
  if (!word) {
    return word;
  }
  const result = word.match(/(([A-Z]{0,1}[a-z]*[^A-Z])|([A-Z]{1}))/g);
  return result.map((s: string) => s.toLowerCase()).join('-');
}
