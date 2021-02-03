import { Action } from '@antv/g2';
import { get, isArray } from '@antv/util';
import { transformData } from '../../utils';

export class TreemapDrillDownAction extends Action {
  // 存储历史下钻 scale
  public cacheDataStack: Record<string, any>[][] = [];

  drill(data) {
    const { view } = this.context;
    const currentData = view.getData();
    const groupScales = view.getGroupScales();
    const hierarchyConfig = get(view, ['interactions', 'treemap-drill-down', 'cfg', 'hierarchyConfig'], {});

    // 重新 update 数据
    const drillData = transformData({
      data,
      colorField: get(groupScales, [0, 'field']),
      openDrillDown: true,
      hierarchyConfig,
    });

    view.changeData(drillData);
    this.cacheDataStack.push(currentData);
  }

  public click() {
    const data = get(this.context, ['event', 'data', 'data']);
    if (!data) return false;
    this.drill(data);
  }

  public reset() {
    const { view } = this.context;
    if (!isArray(this.cacheDataStack) || this.cacheDataStack.length <= 0) {
      return;
    }

    const cacheData = this.cacheDataStack.splice(this.cacheDataStack.length - 1, 1);

    view.changeData(cacheData[0]);
  }
}
