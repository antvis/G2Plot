import { Geometry, IShape } from '../../../../dependents';
import { registerLabelComponent } from '../../../../components/label/base';
import AreaPointAutoLabel from '../../../area/component/label/area-point-auto';

export default class StackedAreaPointAutoLabel extends AreaPointAutoLabel {
  /** 对堆积面积使用自定义的排序 */
  protected sortLabels(geometry: Geometry, labels: IShape[]): IShape[] {
    const sorted: IShape[] = [];
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

registerLabelComponent('stackedArea-point-auto', StackedAreaPointAutoLabel);
