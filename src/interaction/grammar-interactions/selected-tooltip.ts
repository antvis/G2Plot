import { isEqual, last } from '@antv/util';
import { InteractionAction, View, TooltipController, Point, registerComponentController } from '../../dependents';

// @ts-ignore
export class SelectedTooltipController extends TooltipController {
  public get name(): string {
    return 'selected-tooltip';
  }

  protected getTooltipCfg() {
    // @ts-ignore
    const cfg = super.getTooltipCfg();
    return { ...cfg, showContent: false, showCrosshairs: true, showMarkers: true, shared: true };
  }
}
registerComponentController('selected-tooltip', SelectedTooltipController);

export class SelectedTooltipAction extends InteractionAction {
  private location: Point;

  public init() {
    super.init();
  }

  public show() {
    const curLocation = this.getPoint();
    if (!isEqual(curLocation, this.location)) {
      this.location = curLocation;
      this.showTooltip(curLocation);
    }
  }

  public hide() {
    const controller = this.getTooltipController();
    controller.hideTooltip();
  }

  public showTooltip(point: Point) {
    const controller = this.getTooltipController();
    controller.showTooltip(point);
  }

  private getPoint() {
    const ev = this.context.event;

    return ev ? { x: ev.x, y: ev.y } : this.getLastXPoint();
  }

  private getLastXPoint() {
    const view = this.getView();
    const xScale = view.getXScale();
    const yScale = view.getYScales()[0];
    const coordinate = view.getCoordinate();
    const lastX = last(xScale.getTicks()).value;

    return coordinate.convert({ x: lastX, y: (yScale.range[0] + yScale.range[1]) / 2 });
  }

  private getView(): View {
    return this.context.view;
  }

  private getTooltipController() {
    return this.getView().getController('selected-tooltip') as TooltipController;
  }
}
