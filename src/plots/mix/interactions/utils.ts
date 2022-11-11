import { Element, View } from '@antv/g2';
import { each, isArray } from '@antv/util';
import { getAllElements } from '../../../utils';

/**
 * 获取图表元素对应字段的值
 * @param element 图表元素
 * @param field 字段名
 * @ignore
 */
export function getElementValue(element: Element, field) {
  const model = element.getModel();
  const record = model.data;
  let value;
  if (isArray(record)) {
    value = record[0][field];
  } else {
    value = record[field];
  }
  return value;
}

/**
 * @ignore
 * 清理 highlight 效果
 * @param view View 或者 Chart
 */
export function clearHighlight(view: View) {
  const elements = getAllElements(view);
  each(elements, (el) => {
    if (el.hasState('active')) {
      el.setState('active', false);
    }
    if (el.hasState('selected')) {
      el.setState('selected', false);
    }
    if (el.hasState('inactive')) {
      el.setState('inactive', false);
    }
  });
}
