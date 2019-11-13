/**
 * 判断text是否可用, title description
 *
 * @param source
 */
export function isTextUsable(source?: { visible?: boolean; text?: string }): boolean {
  if (!source) return false;
  if (source.visible === true && typeof source.text === 'string' && source.text.trim()) return true;
  return false;
}
