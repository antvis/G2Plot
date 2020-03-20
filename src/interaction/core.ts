import { assign, each, wrapBehavior } from '@antv/util';
import { View, ICanvas } from '../dependents';

interface InteractionCfg {
  view: View;
  startEvent?: string;
  processEvent?: string;
  endEvent?: string;
  resetEvent?: string;
}

export interface InteractionConstructor {
  new (cfg: any): Interaction;
}

const EVENT_TYPES = ['start', 'process', 'end', 'reset'];

export default abstract class Interaction {
  view: View;
  protected canvas: ICanvas;
  startEvent: string;
  processEvent: string;
  endEvent: string;
  resetEvent: string;
  private _eventHandlers: any[];
  constructor(cfg: InteractionCfg) {
    const defaultCfg = this._getDefaultCfg();
    assign(this, defaultCfg, cfg);
    this.canvas = this.view.canvas;
    this._eventHandlers = [];
    this._bindEvents();
  }

  private _getDefaultCfg() {
    return {
      startEvent: 'mousedown',
      processEvent: 'mousemove',
      endEvent: 'mouseup',
      resetEvent: 'dblclick',
    };
  }

  private _start(ev) {
    this.preStart(ev);
    this.start(ev);
    this.afterStart(ev);
  }

  /* eslint-disable */
  protected preStart(ev): void {
    return;
  }
  /* eslint-disable */

  protected abstract start(ev): void;
  
  /* eslint-disable */
  protected afterStart(ev): void {
    return;
  }
  /* eslint-disable */

  private _process(ev) {
    this.preProcess(ev);
    this.process(ev);
    this.afterProcess(ev);
  }

  /* eslint-disable */
  protected preProcess(ev): void {
    return;
  }

  protected process(ev): void {
    return;
  }

  protected afterProcess(ev): void {
    return;
  }
  /* eslint-disable */

  private _end(ev) {
    this.preEnd(ev);
    this.end(ev);
    this.afterEnd(ev);
  }

  /* eslint-disable */
  protected preEnd(ev): void {
    return;
  }

  protected end(ev): void {
    return;
  }

  protected afterEnd(ev): void {
    return;
  }
  /* eslint-disable */

  private _reset(ev?: any) {
    this.preReset(ev);
    this.reset(ev);
    this.afterReset(ev);
  }

  /* eslint-disable */
  protected preReset(ev?: any): void {
    return;
  }

  protected reset(ev?: any): void {
    return;
  }

  protected afterReset(ev?: any): void {
    return;
  }
  /* eslint-disable */

  private _bindEvents() {
    each(EVENT_TYPES, (type) => {
      const eventName = this[`${type}Event`];
      const handler = wrapBehavior(this, `_${type}`);
      this.view.on(eventName, handler);
      this._eventHandlers.push({ type: eventName, handler });
    });
  }

  private _unbindEvents() {
    const eventHandlers = this._eventHandlers;
    each(eventHandlers, (eh) => {
      this.view.off(eh.type, eh.handler);
    });
  }

  public destroy() {
    this._unbindEvents();
    this._reset();
  }
}
