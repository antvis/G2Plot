import * as _ from '@antv/util';
import { DataPointType } from '@antv/g2/lib/interface';
import ElementParser from '../base';

export default class IntervalParser extends ElementParser {
    public init(){
        const props = this.plot._initialProps;
        this.element = {
            type: 'interval',
            position:{
                fields: [props.xField, props.yField]
            } 
        };
        if(props.color) this.parseColor();
        const sizeProps = this._getSizeProps(props);
        if(sizeProps) this.parseSize(sizeProps);
        const styleProps = this._getStyleProps(props);
        if(styleProps) this.parseStyle(styleProps);
    }

    public parseColor(){
        const props = this.plot._initialProps;
        const config: DataPointType = {};
        if(_.isString(props.color)){
            config.values = [props.color];
        }else if(_.isFunction(props.color)){
           config.fields = this.element.position.fields;
           config.callback = props.color;
        }else if(_.isArray(props.color)){
           config.fields = [this.element.position.fields];
           config.values = props.color;
        }
        this.element.color = config;
    }

    public parseSize(sizeProps){
        const props = this.plot._initialProps;
        const config: DataPointType = {};
        config.values = [ props[sizeProps] ];
        this.element.size = config;
    }

    public parseStyle(styleProps){
        const style = this.plot._initialProps[styleProps];
        const config: DataPointType = {};
        if (_.isFunction(style)) {
            config.fields = [ this.element.position.fields ];
            config.callback = style;
        }else{
            config.cfg = style;
        }
        

        this.element.style = config;
    }

    private _getSizeProps(props){
        const sizeMapper = ['columnSize','barSize'];
        for(let i =0; i<sizeMapper.length; i++){
            const m = sizeMapper[i];
            if(_.get(props,m)){
                return m;
            }
        }
    }

    private _getStyleProps(props){
        const sizeMapper = ['columnStyle','barStyle'];
        for(let i =0; i<sizeMapper.length; i++){
            const m = sizeMapper[i];
            if(_.get(props,m)){
                return m;
            }
        }
    }
}