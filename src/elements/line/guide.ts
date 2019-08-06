import * as _ from '@antv/util';
import { DataPointType } from '@antv/g2/lib/interface';
import LineParser from './main';

export default class GuideLineParser extends LineParser {
    public init(){
        const props = this.plot._initialProps;
        if(!props.xField || !props.yField){
            return;
        }
        this.element = {
            type: this.type,
            position:{
                fields: [props.xField, props.yField]
            } 
        };
        
        if(this._needParseAttribute('color')) this.parseColor();
        if(this._needParseAttribute('size')) this.parseSize();
        if(props.line.style) this.parseStyle();
    }

    public parseSize(){
        const props = this.plot._initialProps;
        const config:DataPointType = {};
        if(props.line.style && props.line.style.color){
            config.values = [props.line.style.size];
        }else{
            /**line作为辅助图形没有在style里指定size属性的情况下，设置默认值 */
            config.values = [2];
        }
        this.element.size = config;
    }

    public parseColor(){
        const props = this.plot._initialProps;
        const config: DataPointType =  {}; 
        if(props.line.style && props.line.style.color){
            config.values = [props.line.style.color];
        }else{
             /**line作为辅助图形没有在style里指定color属性的情况下，默认接受主体图形的透传 */
             if(_.isString(props.color)){
                 config.values = [props.color];
            }else if(_.isFunction(props.color)){
                config.fields = this.element.position.fields;
                config.callback = props.color;
            }else if(_.isArray(props.color)){
                config.fields = [this.element.position.fields];
                config.values = props.color;
            }
        }

        this.element.color = config;
    }

    public parseStyle(){
        const props = this.plot._initialProps;
        const styleProps = props.line.style;
        const config: DataPointType = {};
        if (_.isFunction(styleProps)) {
            config.fields = this.element.position.fields;
            config.callback = styleProps;
        }else{
            config.cfg = styleProps;
        }
        this.element.style = config;
    }

    private _needParseAttribute(attr){
        const props = this.plot._initialProps;
        const condition = !props.line.style || props.line.style[attr];
        return condition;
    }

}