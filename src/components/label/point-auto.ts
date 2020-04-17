import { groupBy, each, keys } from '@antv/util';
import { registerLabelComponent } from './base';
import PointLabel from './point';
import { Geometry, IShape, MappingDatum, FIELD_ORIGIN, ORIGIN } from '../../dependents';
import { checkOriginEqual, moveInPanel, checkShapeOverlap } from '../../util/view';
import BBox from '../../util/bbox';

export default class PointAutoLabel extends PointLabel {
  protected layoutLabels(geometry: Geometry, labels: IShape[]): void {
    const dones: IShape[] = [];
    const panel = BBox.fromBBoxObject(geometry.canvasRegion);
    const [xField, yField] = geometry.getXYFields();
    const groupedMap: Record<string, IShape[]> = groupBy(labels, (label) => label.get(ORIGIN)[FIELD_ORIGIN][xField]);
    const offset = labels[0]?.get('offset');

    each(keys(groupedMap).reverse(), (xValue: string) => {
      const group: IShape[] = groupedMap[xValue];
      group.sort((a, b) => {
        return b.get(ORIGIN)[FIELD_ORIGIN][yField] - a.get(ORIGIN)[FIELD_ORIGIN][yField];
      });
      // 放置顺序：第一个，最后一个、其他
      const stack = [group.shift()];
      while (stack.length) {
        const label = stack.pop();
        const next = group.pop();
        if (next) {
          stack.push(next);
        }
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
}

registerLabelComponent('point-auto', PointAutoLabel);
