import * as _ from '@antv/util';
import { DataPointType } from '@antv/g2/lib/interface';
import ElementParser from '../base';

export default class AreaParser extends ElementParser {

    public init(){
        const props = this.plot._initialProps;
        this.element = {
            type: 'area',
            position:{
                fields: [props.xField, props.yField]
            } 
        };
        if (props.smooth) this.element.shape = { values: [ 'smooth' ] };
        if (props.stackField || props.color) this.parseColor();
        if (props.area && props.area.style) this.parseStyle();
    }

    public parseColor(){
        const props = this.plot._initialProps;
        const config: DataPointType = {};
        if (_.has(props, 'stackField')) {
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
        const styleProps = props.area.style;
        const config:DataPointType = {};
        if (_.isFunction(styleProps) && props.seriesField) {
            config.fields = [ props.seriesField ];
            config.callback = styleProps;
        }else{
            config.cfg = styleProps;
        }
        this.element.style = config;
    }

}