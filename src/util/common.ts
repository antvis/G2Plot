import { View, Axis, Legend, COMPONENT_TYPE } from '../dependents';

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

/**
 * 获取 View 中所有的 Axis 组件
 */
export function getAxisComponents(view: View): Axis.Base[] {
  return (view
    .getComponents()
    .filter((co) => co.type === COMPONENT_TYPE.AXIS)
    .map((co) => co.component) as unknown) as Axis.Base[];
}

export function getLegendComponents(view: View): Legend.Base[] {
  return (view
    .getComponents()
    .filter((co) => co.type === COMPONENT_TYPE.LEGEND)
    .map((co) => co.component) as unknown) as Legend.Base[];
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

export function sortedLastIndex<T>(arr: T[], val: T): number {
  let i = arr.length;
  while (i > 0) {
    if (val >= arr[i - 1]) {
      break;
    }
    i -= 1;
  }
  return i;
}
