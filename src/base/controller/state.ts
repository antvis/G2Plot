/**
 * stateManager负责stateManager的创建/绑定，对状态量更新的响应
 */
import { IGroup, IShape } from '../../dependents';
import { isFunction, assign, each, isArray, mix, clone } from '@antv/util';
import { getComponentStateMethod } from '../../components/factory';
import { onEvent } from '../../util/event';
import StateManager from '../../util/state-manager';

export function compare(origin, condition) {
  if (!isFunction(condition)) {
    const { name, exp } = condition;
    if (isFunction(exp)) {
      return exp(origin[name]);
    }
    return origin[name] === exp;
  }
  return condition(origin);
}

export default class StateController {
  private plot: any;
  private stateManager: StateManager;
  private shapes: IShape[];
  private originAttrs: any[]; // 缓存图形的原始属性
  private shapeContainers: IGroup[] = [];

  constructor(cfg) {
    assign(this, cfg);
  }

  public createStateManager(cfg) {
    this.stateManager = new StateManager(cfg);
  }

  public bindStateManager(manager: StateManager, cfg) {
    this.stateManager = manager;
    if (cfg.setState) {
      this._updateStateProcess(cfg.setState);
    }
    if (cfg.onStateChange) {
      this._stateChangeProcess(cfg.onStateChange);
    }
  }

  public defaultStates(states) {
    each(states, (state, type) => {
      const { condition, style, related } = state;
      this.setState({ type, condition, related });
    });
  }

  public setState(cfg) {
    const { type, condition, related } = cfg;
    if (!this.shapes) {
      this.shapes = this._getShapes();
      this.originAttrs = this._getOriginAttrs();
    }
    // this.resetZIndex();
    each(this.shapes, (shape, index) => {
      const shapeOrigin = shape.get('origin').data;
      const origin = isArray(shapeOrigin) ? shapeOrigin[0] : shapeOrigin;
      if (compare(origin, condition)) {
        const stateStyle = cfg.style ? cfg.style : this._getDefaultStateStyle(type, shape);
        const originAttr = this.originAttrs[index];
        let attrs;
        if (isFunction(stateStyle)) {
          attrs = stateStyle(originAttr);
        } else {
          attrs = mix({}, originAttr, stateStyle);
        }
        shape.attr(attrs);
        this.setZIndex(type, shape);
        // const canvas = this.plot.canvas;
        // canvas.draw();
      }
    });
    // 组件与图形对状态量的响应不一定同步
    if (related) {
      this._parserRelated(type, related, condition);
    }
    this.plot.canvas.draw();
  }

  private _updateStateProcess(setStateCfg) {
    each(setStateCfg, (cfg: any) => {
      const state = cfg.state;
      let handler;
      if (isFunction(state)) {
        handler = (e) => {
          const s = state(e);
          this.stateManager.setState(s.name, s.exp);
        };
      } else {
        handler = () => {
          this.stateManager.setState(state.name, state.exp);
        };
      }
      if (cfg.event) {
        onEvent(this.plot, this._eventParser(cfg.event), handler);
      } else {
        handler();
      }
    });
  }

  private _stateChangeProcess(onChangeCfg) {
    each(onChangeCfg, (cfg: any) => {
      this.stateManager.on(`${cfg.name}:change`, (props) => {
        cfg.callback(props, this.plot);
      });
    });
  }

  private _getShapes() {
    const shapes = [];
    const geoms = this.plot.view.geometries;
    each(geoms, (geom: any) => {
      const shapeContainer = geom.container;
      this.shapeContainers.push(shapeContainer);
      if (!geom.destroyed) {
        shapes.push(...geom.getShapes());
      }
    });
    return shapes;
  }

  private _getOriginAttrs() {
    const attrs = [];
    each(this.shapes, (shape) => {
      attrs.push(clone(shape.attr()));
    });
    return attrs;
  }

  // 将g2 geomtry转为plot层geometry
  private _eventParser(event) {
    const eventCfg = event.split(':');
    const eventTarget = this.plot.geometryParser('g2', eventCfg[0]);
    const eventName = eventCfg[1];
    return `${eventTarget}:${eventName}`;
  }

  private _getDefaultStateStyle(type, shape) {
    const theme = this.plot.theme;
    const plotGeomType = this.plot.geometryParser('plot', shape.name);
    const styleField = `${plotGeomType}Style`;
    if (theme[styleField]) {
      let style = theme[styleField][type];
      if (isFunction(style)) {
        style = style(shape.attr());
      }
      return style;
    }
    return {};
  }

  private _parserRelated(type, related, condition) {
    each(related, (r) => {
      if (this.plot[r]) {
        // fixme: 自定义组件
        // this.plot[r].setState(type, condition);
        const method = getComponentStateMethod(r, type);
        method(this.plot, condition);
      }
    });
  }

  // private set
  private setZIndex(stateType: string, shape: IShape | any) {
    if (stateType === 'active' || stateType === 'selected') {
      // shape.setZIndex(1);
      const children = shape.get('parent').get('children');
      children[children.length - 1].setZIndex(0);
      shape.setZIndex(1);
    }
  }

  private resetZIndex() {
    each(this.shapeContainers, (container) => {
      const children = container.get('children');
      children.sort((obj1, obj2) => {
        return obj1._INDEX - obj2._INDEX;
      });
    });
  }
}
