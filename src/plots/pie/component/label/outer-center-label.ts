import { IShape, BBox } from '@antv/g-canvas';
import * as _ from '@antv/util';
import { LabelItem } from './base-label';
import PieOuterLabel from './outer-label';

// 默认label和element的偏移 16px
export const DEFAULT_OFFSET = 16;

export default class PieOuterCenterLabel extends PieOuterLabel {
  /** @override label 碰撞调整 */
  protected layout(labels: IShape[], shapeInfos: LabelItem[], panelBox: BBox) {
    this.adjustOverlap(labels, panelBox);
  }
}
