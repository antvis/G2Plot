import { filter, each, findIndex } from '@antv/util';
import {
  InteractionAction,
  View,
  TooltipController,
  Point,
  registerComponentController,
  Geometry,
} from '../../../dependents';

// @ts-ignore
export class ActiveTooltipController extends TooltipController {
  public get name(): string {
    return 'tooltip-active';
  }
  protected getTooltipCfg() {
    // @ts-ignore
    const cfg = super.getTooltipCfg();
    return { ...cfg, showCrosshairs: true, showMarkers: false, shared: true };
  }
}

registerComponentController('tooltip-active', ActiveTooltipController);

class MarkerActiveAction extends InteractionAction {
  public init() {
    // 移除默认的tooltip交互
    this.getView().removeInteraction('tooltip');
  }

  public show() {
    const curLocation = this.getPoint();
    if (curLocation) {
      this.showTooltip(curLocation);
    }
  }

  public hide() {
    const view = this.getView();
    const controller = this.getTooltipController();
    controller.hideTooltip();
    const points: Geometry[] = filter(view.geometries, (geom) => geom.type == 'point');
    each(points, (point: Geometry) => {
      each(point.elements, (element) => {
        element.setState('active', false);
      });
    });
  }

  public showTooltip(point: Point) {
    const view = this.getView();
    const controller = this.getTooltipController();
    controller.showTooltip(point);
    const items = controller.getTooltipItems(point);
    const points: Geometry[] = filter(view.geometries, (geom) => geom.type == 'point');
    each(points, (point: Geometry) => {
      each(point.elements, (element) => {
        element.setState('active', findIndex(items, (item) => item.data === element.data) !== -1);
      });
    });
  }

  private getPoint(): Point | null {
    const ev = this.context.event;

    return ev ? { x: ev.x, y: ev.y } : null;
  }

  private getView(): View {
    return this.context.view;
  }

  private getTooltipController() {
    return this.getView().getController('tooltip-active') as TooltipController;
  }
}

export default MarkerActiveAction;
