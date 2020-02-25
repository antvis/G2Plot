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

/**
 * 为字符串添加换行符
 * @param source - 字符串数组 ['a', 'b', 'c']
 * @param breaks - 要添加换行的index
 *
 * @example
 * ```js
 * breakText(['a','b','c'], [1])
 *
 * // a\nbc
 * ```
 */
export function breakText(source: string[], breaks: number[]): string {
  const result = [...source];
  breaks.forEach((pos, index) => {
    result.splice(pos + index, 0, '\n');
  });
  return result.join('');
}

export function getAxisShapes(view) {
  const axisShape = view.backgroundGroup.findAll((el) => {
    if (el.get('name')) {
      const name = el.get('name').split('-');
      return name[0] === 'axis';
    }
  });
  return axisShape;
}

export function getLegendShapes(view) {
  const axisShape = view.foregroundGroup.findAll((el) => {
    if (el.get('name')) {
      return el.get('name') === 'legend-item-group';
    }
  });
  return axisShape;
}
