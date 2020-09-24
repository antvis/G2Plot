import { View } from '@antv/g2';

/**
 * 在 Chart 中查找特定 id 的子 View
 * @param chart
 * @param id
 */
export function findViewById(chart: View, id: string): View {
  return chart.views.find((view: View) => view.id === id);
}
