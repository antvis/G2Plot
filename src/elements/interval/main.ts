import * as _ from '@antv/util';
import { DataPointType } from '@antv/g2/lib/interface';
import ElementParser from '../base';

const COLOR_MAPPER = ['colorField','stackField','groupField'];

export default class IntervalParser extends ElementParser {
    public init(){
        this.type = 'interval';
        super.init();
        const props = this.plot._initialProps;
        if(this._needParserColor()) this.parseColor();
        const sizeProps = this._getSizeProps(props);
        if(sizeProps) this.parseSize(sizeProps);
        const styleProps = this._getStyleProps(props);
        if(styleProps) this.parseStyle(styleProps);
    }

    public parseColor(){
        const props = this.plot._initialProps;
        const colorField = this._getColorMappingField(props);
        const config: DataPointType = {};
        if(colorField){
            config.fields = colorField;
        }
        if(props.color){
            if(_.isString(props.color)){
                config.values = [props.color];
            }else if(_.isFunction(props.color)){
                config.fields = colorField;
                config.callback = props.color;
            }else if(_.isArray(props.color)){
                config.fields = colorField;
                config.values = props.color;
            }
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
        const sizeMapper = ['columnStyle','barStyle','pieStyle'];
        for(let i =0; i<sizeMapper.length; i++){
            const m = sizeMapper[i];
            if(_.get(props,m)){
                return m;
            }
        }
    }

    private _getColorMappingField(props){
        /**如果有colorFiled或stackField配置项(后者为堆叠interval)，则参与colorMapping的字段为对应值
         * 如没有特别设定，则一般是callback中的传参，传入位置映射的字段
         */
        for(let i =0; i < COLOR_MAPPER.length; i++){
            const m = COLOR_MAPPER[i];
            if(_.get(props,m)) return [props[m]];
        }
        return this.element.position.fields;
    }

    private _needParserColor(){
        const props = this.plot._initialProps;
        if(props.color) return true;
        for(let i = 0; i<COLOR_MAPPER.length; i++) {
            const m = COLOR_MAPPER[i];
            if(props[m]) return true;
        }
    }
}