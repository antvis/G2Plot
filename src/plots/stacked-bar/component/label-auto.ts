import { registerLabelComponent } from '../../../components/label/base';
import BarAutoLabel from '../../bar/component/label-auto';
import { Element, IShape } from '../../../dependents';

/** 自动模式的 StackedBar 数据标签，会根据图形和数据标签自动优化数据标签布局和样式等 */
export default class StackedBarAutoLabel extends BarAutoLabel {
  /** 默认 middle 位置 */
  protected getPosition(element: Element): { x: number; y: number } {
    const bbox = this.getElementShapeBBox(element);
    const { minX, minY, height, width } = bbox;
    const { offsetX, offsetY } = this.options;
    const y = minY + height / 2 + offsetY;
    const x = minX + width / 2 + offsetX;

    return { x, y };
  }

  /** 默认自动隐藏 */
  protected adjustLabel(label: IShape, element: Element): void {
    const labelRange = label.getBBox();
    const shapeRange = this.getElementShapeBBox(element);
    if (shapeRange.width <= labelRange.width) {
      label.set('visible', false);
    }
  }

  /** 堆积柱形图全部内置 */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected shouldInShapeLabels(labels: IShape[]): boolean {
    return true;
  }
}

registerLabelComponent('stacked-bar-auto', StackedBarAutoLabel);
