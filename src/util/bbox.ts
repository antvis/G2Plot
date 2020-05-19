import { BBox as BBoxBase } from '@antv/g2/lib/util/bbox';
export { DIRECTION } from '@antv/g2/lib/constant';
export { Padding, Point, Region } from '@antv/g2/lib/interface';

export default class BBox extends BBoxBase {
  static fromBBoxObject(bbox: any) {
    return new BBox(bbox.x, bbox.y, bbox.width, bbox.height);
  }
}
