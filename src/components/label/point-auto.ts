import { groupBy, each, keys } from '@antv/util';
import { registerLabelComponent } from './base';
import PointLabel from './point';
import { Geometry, IShape, MappingDatum, FIELD_ORIGIN, ORIGIN } from '../../dependents';
import { Label } from '../../interface/config';
import { checkOriginEqual, moveInPanel, checkShapeOverlap } from '../../util/view';
import BBox from '../../util/bbox';

export default class PointAutoLabel<L extends Label = Label> extends PointLabel<L> {
  protected layoutLabels(geometry: Geometry, labels: IShape[]): void {
    const dones: IShape[] = [];
    const panel = BBox.fromBBoxObject(geometry.canvasRegion);
    const [xField, yField] = geometry.getXYFields();
    const groupedMap: Record<string, IShape[]> = groupBy(labels, (label) => label.get(ORIGIN)[FIELD_ORIGIN][xField]);
    const offset = labels[0]?.get('offset');

    each(keys(groupedMap).reverse(), (xValue: string) => {
      const group = this.sortLabels(geometry, groupedMap[xValue]);
      while (group.length) {
        const label = group.shift();
        if (
          checkOriginEqual(
            label,
            dones,
            (datumLeft: MappingDatum, datumRight: MappingDatum) =>
              datumLeft._origin[xField] === datumRight._origin[xField] &&
              datumLeft._origin[yField] === datumRight._origin[yField]
          )
        ) {
          label.set('visible', false);
          continue;
        }
        moveInPanel(label, panel);
        const upFail = checkShapeOverlap(label, dones);
        let downFail: boolean;
        if (upFail) {
          label.attr('y', label.attr('y') + 2 * offset);
          moveInPanel(label, panel);
          downFail = checkShapeOverlap(label, dones);
        }
        if (downFail) {
          label.set('visible', false);
          continue;
        }
        dones.push(label);
      }
    });
  }

  /** 对 Labels 排序，排序顺序决定自动布局优先级 */
  protected sortLabels(geometry: Geometry, labels: IShape[]): IShape[] {
    const yField = geometry.getXYFields()[1];
    const sorted: IShape[] = [];

    // 顺序：第一个、最后一个、再其他
    labels.sort((a, b) => {
      return b.get(ORIGIN)[FIELD_ORIGIN][yField] - a.get(ORIGIN)[FIELD_ORIGIN][yField];
    });
    if (labels.length > 0) {
      sorted.push(labels.shift());
    }
    if (labels.length > 0) {
      sorted.push(labels.pop());
    }
    sorted.push(...labels);

    return sorted;
  }
}

registerLabelComponent('point-auto', PointAutoLabel);
