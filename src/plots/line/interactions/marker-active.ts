import { each, findIndex } from '@antv/util';
import { InteractionAction, View, Geometry } from '@antv/g2';

export class MarkerActiveAction extends InteractionAction {
  public active() {
    const view = this.getView();
    const evt = this.context.event;
    if (evt.data) {
      // items: 数组对象，当前 tooltip 显示的每条内容
      const { items } = evt.data;
      const points = view.geometries.filter((geom) => geom.type === 'point');
      each(points, (point: Geometry) => {
        each(point.elements, (element) => {
          const active = findIndex(items, (item) => (item as any).data === element.data) !== -1;
          // @ts-ignore
          element.setState('active', active);
        });
      });
    }
  }

  private getView(): View {
    return this.context.view;
  }
}
