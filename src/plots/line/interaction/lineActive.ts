import { Interaction } from '@antv/g2';

export default class LineActive extends Interaction {
  constructor(cfg) {
    super({
      /** 没有用 line:mouseenter 和 line:mouseleave 事件，是因为可能在多条折线的情况下，从一条线滑动到另一条会同时触发process和reset，使画面出现闪动 */
      processEvent: 'mousemove',
      ...cfg,
    });
  }

  public process(ev) {
    const target = ev.target;
    if (target.name === 'line') {
      const data = ev.data[0]._origin;
      this.view.setActive((obj) => {
        return obj === data;
      });
    } else {
      this.view.setActive(() => {
        return false;
      });
    }
  }
}
