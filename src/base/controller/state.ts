/**
 * stateManager负责stateManager的创建/绑定，对状态量更新的响应
 */
import { Shape } from '@antv/g';
import * as _ from '@antv/util';
import { onEvent } from '../../util/event';
import StateManager from '../../util/stateManager';

export default class StateController{
  private plot: any;
  private stateManager: StateManager;
  private shapes: Shape[];
  private originAttrs: any[]; // 缓存图形的原始属性

  constructor(cfg) {
    _.assign(this, cfg);
  }

  public createStateManager(cfg) {
    this.stateManager = new StateManager(cfg);
  }

  public bindStateManager(manager:StateManager, cfg) {
    this.stateManager = manager;
    cfg.setState && this._updateStateProcess(cfg.setState);
    cfg.onStateChange &&  this._stateChangeProcess(cfg.onStateChange);
  }

  public setActive(condition,style){
    this.setState('active',condition,style);
  }

  public setSelected(condition,style){
    this.setState('selected',condition,style);

  }

  public setNormal(condition){
    this.setState('normal',condition,{});
  }

  public setState(type,condition,style?){
    if(!this.shapes) {
      this.shapes = this._getShapes();
      this.originAttrs = this._getOriginAttrs();
    }
    _.each(this.shapes,(shape,index)=>{
      const shapeOrigin = shape.get('origin');
      const origin = _.isArray(shapeOrigin) ? shapeOrigin[0]._origin : shapeOrigin._origin;
      if(this._compare(origin,condition)){
        const stateStyle = style ? style : this._getDefaultStateStyle(type,shape);
        const originAttr = this.originAttrs[index];
        const attrs = _.mix({},originAttr,stateStyle);
        shape.attr(attrs);
      }
    });
    this.plot.canvasController.canvas.draw();
  }

  private _updateStateProcess(setStateCfg) {
    _.each(setStateCfg, (cfg:any) => {
      const state = cfg.state;
      let handler;
      if(_.isFunction(state)){
        handler = (e) =>{
          const s = state(e);
          this.stateManager.setState(s.name, s.exp);
        };
      }else{
        handler = () => {
          this.stateManager.setState(state.name, state.exp);
        };
      }
      if (cfg.event) {
        onEvent(this.plot, this._eventParser(cfg.event), handler);
      }else {
        handler();
      }
    });
  }

  private _stateChangeProcess(onChangeCfg) {
    _.each(onChangeCfg, (cfg:any) => {
      this.stateManager.on(`${cfg.name}:change`, (props) => {
        cfg.callback(props,this.plot);
      });
    });
  }

  private _getShapes(){
   const shapes = [];
    const geoms = this.plot.plot.get('elements');
    _.each(geoms,(geom:any)=>{
      shapes.push(...geom.getShapes());
    });
    return shapes;
  }

  private _getOriginAttrs(){
    const attrs = [];
    _.each(this.shapes,(shape)=>{
      attrs.push(_.clone(shape.attr()));
    });
    return attrs;
  }

  private _compare(origin,condition){
    if(!_.isFunction(condition)){
      const {name,exp} = condition;
      return origin[name] === exp;
    }
    return condition(origin);
  }

  // 将g2 geomtry转为plot层geometry
  private _eventParser(event){
    const eventCfg = event.split(':');
    const eventTarget = this.plot.geometryParser('g2',eventCfg[0]);
    const eventName = eventCfg[1];
    return `${eventTarget}:${eventName}`;
  }

  private _getDefaultStateStyle(type,shape){
    const theme = this.plot.plotTheme;
    const plotGeomType = this.plot.geometryParser('plot',shape.name);
    const styleField = `${plotGeomType}Style`;
    if(theme[styleField]){
      let style = theme[styleField][type];
      if(_.isFunction(style)){
        style = style(shape.attr());
      }
      return style;
    }
    return {};
  }

}
