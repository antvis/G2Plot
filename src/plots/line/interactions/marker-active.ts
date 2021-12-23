import { each, findIndex } from '@antv/util';
import { InteractionAction, View } from '@antv/g2';
import { findGeometry } from '../../../utils';

export class MarkerActiveAction extends InteractionAction {
  public active() {
    const view = this.getView();
    const evt = this.context.event;
    if (evt.data) {
      // items: 数组对象，当前 tooltip 显示的每条内容
      const { items } = evt.data;
      const point = findGeometry(view, 'point');
      if (point) {
        each(point.elements, (element) => {
          const active = findIndex(items, (item) => (item as any).data === element.data) !== -1;
          element.setState('active', active);
        });
      }
    }
  }

  public reset() {
    const view = this.getView();
    const point = findGeometry(view, 'point');
    if (point) {
      each(point.elements, (element) => {
        element.setState('active', false);
      });
    }
  }

  private getView(): View {
    return this.context.view;
  }
}
