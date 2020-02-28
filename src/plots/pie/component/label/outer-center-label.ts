import Polar from '@antv/coord/lib/coord/polar';
import { BBox, Shape } from '@antv/g';
import { registerElementLabels } from '@antv/g2';
import { LabelItem } from '@antv/component/lib/interface';
import * as _ from '@antv/util';
import { getEndPoint } from './utils';
import BasePieLabel from './base-label';
import { DEFAULT_OFFSET, CROOK_DISTANCE } from './outer-label';

class OuterCenterPieLabel extends BasePieLabel {
  public adjustPosition(labels: Shape[], items: LabelItem[], coord: Polar, panel: BBox) {
    this._adjustLabelPosition(labels, items, coord, panel);
  }

  /** @override */
  public adjustLines(labels: Shape[], labelItems: LabelItem[], labelLines: any, coord: Polar, panel: BBox) {
    _.each(labels, (label, idx: number) => {
      const labelLine = labelLines[idx];
      const path = this._getLinePath(label, coord, panel);
      labelLine.attr('path', path);
      labelLine.set('visible', label.get('visible'));
    });
  }

  /** @override */
  protected getOffsetOfLabel(): number {
    const labelOptions = this.get('labelOptions');
    const offset = labelOptions.offset;
    return offset === undefined ? DEFAULT_OFFSET : offset <= CROOK_DISTANCE ? 1 : offset - CROOK_DISTANCE;
  }

  // label shape position
  private _adjustLabelPosition(labels: Shape[], items: LabelItem[], coord: Polar, panel: BBox) {
    const center = coord.getCenter();
    const r = coord.getRadius();
    const distance = this.getCrookDistance();
    labels.forEach((l, idx) => {
      const item = items[idx];
      const offset = this.getOffsetOfLabel();
      const pos = getEndPoint(center, item.angle, r + offset);
      const isRight = item.textAlign === 'left';
      l.attr('x', pos.x + (isRight ? distance * 2 : -distance * 2));
      l.attr('y', pos.y);
    });
  }

  // 获取label leader-line
  private _getLinePath(label: Shape, coord: Polar, panel: BBox): string {
    const labelOptions = this.getLabelOptions();
    const smooth = labelOptions.line ? labelOptions.line.smooth : false;
    const anchor = this.anchors.find((a) => a.id === label.id);
    const angle = anchor.angle;
    const center = coord.getCenter();
    const r = coord.getRadius();
    const start = getEndPoint(center, angle, r);
    // because shape is adjusted, so we should getAttrbutes by shape
    const offset = this.getOffsetOfLabel();
    const isRight = anchor.textAlign === 'left';
    const breakAt = getEndPoint(center, angle, r + offset);
    const distance = this.getCrookDistance() * (isRight ? 1 : -1);
    const end = { x: label.attr('x') - distance, y: label.attr('y') };
    let path = '';
    path = [`M ${start.x}`, `${start.y} Q${breakAt.x}`, `${breakAt.y} ${end.x}`, end.y].join(',');
    if (smooth === false) {
      // normal path rule, draw path is "M -> L -> H"
      path = [`M ${start.x}`, `${start.y} L${breakAt.x}`, `${breakAt.y} H${end.x}`].join(',');
    }
    return path;
  }

  /** @override */
  // tslint:disable
  public getDefaultOffset(point) {
    const offset = super.getDefaultOffset(point);
    return offset === undefined ? DEFAULT_OFFSET : offset <= CROOK_DISTANCE ? 1 : offset - CROOK_DISTANCE;
  }

  private getCrookDistance(): number {
    const labelOptions = this.get('labelOptions');
    const offset = labelOptions.offset;
    return offset < CROOK_DISTANCE * 2 ? offset / 2 : CROOK_DISTANCE;
  }
}

registerElementLabels('outer-center', OuterCenterPieLabel);
