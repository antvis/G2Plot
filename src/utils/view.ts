import { Chart, Geometry, View } from '@antv/g2';
import Element from '@antv/g2/lib/geometry/element';
import { reduce } from '@antv/util';

/**
 * 在 Chart 中查找特定 id 的子 View
 * @param chart
 * @param id
 */
export function findViewById(chart: View, id: string): View {
  return chart.views.find((view: View) => view.id === id);
}
