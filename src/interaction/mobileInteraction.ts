import { GM } from '@antv/g-gesture';
import { Interaction } from '@antv/g2';
import * as _ from '@antv/util';

const EVENT_TYPES = ['touchstart', 'touchmove', 'touchend', 'touchcancel'];

export default class MobileInteraction extends Interaction {
  public gm: GM;
  private _handlers: any[];
  constructor(cfg) {
    super(cfg);
    const container = this.view.get('container');
    this.gm = new GM(container, {
      gestures: ['Pinch, Pan'], // 后续需要的添加到这个列表里
    });
  }
  /*_bindEvents() {
    _.each(EVENT_TYPES, (type) => {
      const eventName = this[`${type}Event`];
      const handler = _.wrapBehavior(this, `_${type}`);
      this.gm.on(eventName, handler);
      this._handlers.push({ type: eventName, handler });
    });
  }

  _unbindEvents() {
    const handlers = this._handlers;
    _.each(handlers, (eh) => {
      this.view.off(eh.type, eh.handler);
    });
  }*/
}
