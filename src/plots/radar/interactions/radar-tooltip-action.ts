import { registerComponentController, Util, TooltipController, Action } from '@antv/g2';
import { isNil } from '@antv/util';
import { Point } from '../../../types';

export class RadarTooltipController extends TooltipController {
  public get name(): string {
    return 'radar-tooltip';
  }

  public getTooltipItems(point: Point) {
    const { shared, title: cfgTitle } = this.getTooltipCfg();
    const hintItems = super.getTooltipItems(point);

    if (hintItems.length > 0) {
      const geometry = this.view.geometries[0];
      const dataArray = geometry.dataArray;
      const title = hintItems[0].name;
      const result = [];
      dataArray.forEach((mappingData) => {
        mappingData.forEach((d) => {
          const items = Util.getTooltipItems(d, geometry);
          const item = items[0];
          if (!shared && item && item.name === title) {
            const displayTitle = isNil(cfgTitle) ? title : cfgTitle;
            result.push({ ...item, name: item.title, title: displayTitle });
          } else if (shared && item) {
            const displayTitle = isNil(cfgTitle) ? item.name || title : cfgTitle;
            result.push({ ...item, name: item.title, title: displayTitle });
          }
        });
      });

      return result;
    }
    return [];
  }
}
registerComponentController('radar-tooltip', RadarTooltipController);

/**
 * 雷达图 tooltip 激活 action
 */
export class RadarTooltipAction extends Action {
  init() {
    const { view } = this.context;
    view.removeInteraction('tooltip');
  }

  public show() {
    const { event } = this.context;
    const controller = this.getTooltipController();
    controller.showTooltip({ x: event.x, y: event.y });
  }

  public hide() {
    const controller = this.getTooltipController();
    controller.hideTooltip();
  }

  private getTooltipController() {
    const { view } = this.context;
    return view.getController('radar-tooltip') as TooltipController;
  }
}
