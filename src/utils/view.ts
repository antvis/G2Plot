import { View } from '@antv/g2';

/**
 * 在 Chart 中查找特定 id 的子 View
 * @param chart
 * @param id
 */
export function findViewById(chart: View, id: string): View {
  return chart.views.find((view: View) => view.id === id);
}

/**
 * 获取同 view 同一级的所有 views
 * @param view 当前 view
 * @returns 同一级的 views
 * @ignore
 */
export function getViews(view: View): View[] {
  const parent = view.parent;
  return parent ? parent.views : [];
}

/**
 * 获取同 view 同一级的 views，不包括自身
 * @param view 当前 view
 * @returns 同一级的 views
 * @ignore
 */
export function getSiblingViews(view: View): View[] {
  return getViews(view).filter((sub) => sub !== view);
}
