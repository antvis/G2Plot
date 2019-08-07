import * as _ from '@antv/util';
import { DataPointType } from '@antv/g2/lib/interface';
import ElementParser from '../base';


export default class LineParser extends ElementParser {

    public init(){
        const props = this.plot._initialProps;
        this.element = {
            type: 'line',
            position:{
                fields: [props.xField, props.yField]
            } 
        };
        if (props.size) this.parseSize();
        if (props.smooth) this.element.shape = { values: [ 'smooth' ] };
        if (props.seriesField || props.color) this.parseColor();
        if (props.lineStyle) this.parseStyle();
    }

    public parseSize(){
        const sizeProps = this.plot._initialProps.size;
        const config: DataPointType = {};
        if(_.isFunction(sizeProps)){
            config.callback = sizeProps;
        }else{
            config.values = [sizeProps];
        }
        this.element.size = config;
    }

    public parseColor(){
        const props = this.plot._initialProps;
        const config: DataPointType = {};
        if (_.has(props, 'seriesField')) {
            config.fields = [ props.seriesField ];
        }
        if (_.has(props, 'color')) {
            const color = props.color;
            if (_.isString(color)) {
                config.values = [ color ];
            }else if(_.isFunction(color)){
                config.callback = color;
            } else {
                config.values = color as [];
            }
        }

        this.element.color = config;
    }

    public parseStyle(){
        const props = this.plot._initialProps;
        const styleProps = props.lineStyle;
        const config = {
            fields: null,
            callback: null,
            cfg: null,
        };
        if (_.isFunction(styleProps) && props.seriesField) {
            config.fields = [ props.seriesField ];
            config.callback = styleProps;
        }else{
            config.cfg = styleProps;
        }
        this.element.style = config;
    }
}