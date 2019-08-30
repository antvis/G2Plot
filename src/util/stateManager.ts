/**
 * 可插拔的状态量管理机
 */
// todo: 后续还需要加入交互互斥的维护机制
import EventEmitter from '@antv/event-emitter';
import * as _ from '@antv/util';

interface States {
  [key: string]: any;
}

interface StateControllerCfg {
  states?: States;
}

export default class StateManager extends EventEmitter {
  private _states: States;
  private _stateStack: States;
  private _changeTimer: any;

  constructor(cfg: StateControllerCfg) {
    super();
    this._states = {};
    this._stateStack = {};
  }

  public setState(name: string, exp: any) {
    this._stateStack[name] = exp;
    this._onUpdate();
  }

  public getState(name: string) {
    return this._states[name];
  }

  public getAllStates() {
    return this._states;
  }

  public clear() {
    this._states = {};
    this._stateStack = {};
    if (this._changeTimer) {
      clearTimeout(this._changeTimer);
      this._changeTimer = null;
    }
  }

  private _onUpdate() {
    const stateStack = this._stateStack;

    if (this._changeTimer) {
      clearTimeout(this._changeTimer);
      this._changeTimer = null;
    }

    this._changeTimer = setTimeout(() => {
      // for (const name in stateStack) {
      _.each(stateStack, (exp, name) => {
        const state = stateStack[name];
        if (!this._states[name] || this._states[name] !== exp) {
          // update states
          this._states[name] = exp;
          // dispatch state event
          this._triggerEvent(name, state);
        }
      });
      // }
      // clear stack
      this._stateStack = {};
    }, 16);
  }

  private _triggerEvent(name: string, exp: any) {
    this.emit(`${name}:change`, {
      name,
      exp,
    });
  }
}
